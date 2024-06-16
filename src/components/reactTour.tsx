import React, { ReactElement, useContext, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components';
import { ReactTourContext } from './reactTourProvider';


interface ReactTourType {
    index: number,
    position: "top" | "right" | "bottom" | "left";
    body: ReactElement,
    children: ReactElement
}

export default function ReactTour({ index, position, body, children }: ReactTourType) {

    const { currentIndex, indexes, buttonBackgroundColor, buttonTextColor, backgroundColor, setIndexes, Next, Previous, Done } = useContext(ReactTourContext);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIndexes(pre => { if (!pre.includes(index)) { return [...pre, index] } else { return pre } })
    }, [])

    useEffect(() => {
        if (index === indexes[currentIndex!] && ref.current) {
            // console.log("Run");
            ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, [currentIndex])


    return (
        <div ref={ref} style={{ position: "relative", width: "min-content" }}>

            {
                children
            }

            {
                index === indexes[currentIndex!] &&
                <TourContainer position={position} >
                    <TourContent className={position} backgroundColor={backgroundColor}>
                        {body}
                        <TourNavigationButton buttonBackgroundColor={buttonBackgroundColor} buttonTextColor={buttonTextColor}  >

                            {
                                (currentIndex != 0) &&
                                <div className="button" onClick={() => { Previous() }}>Previous</div>
                            }
                            {
                                (currentIndex != indexes.length - 1) &&
                                <div className="button" onClick={() => { Next() }}>Next</div>
                            }
                            {
                                (currentIndex == indexes.length - 1) &&
                                <div className="button" onClick={() => { Done() }}>Done</div>
                            }
                        </TourNavigationButton>
                        <button className="close" onClick={() => { Done() }}>&times;</button>
                    </TourContent>
                </TourContainer>
            }

        </div>
    )
}

const TourContainer = styled.div<Pick<ReactTourType, "position">>`
    position: absolute;
    z-index: 9999;

    ${(p) => (p.position == "top" && css`
        top: 0%;
        left: 50%;
        transform: translate(-50%, -105%);
    `)}
    
    ${(p) => (p.position == "right" && css`
        top: 50%;
        left: 100%;
        transform: translate(5%, -50%);
    `)}

    ${(p) => (p.position == "bottom" && css`
        top: 105%;
        left: 50%;
        transform: translate(-50%, 5%);
    `)}

    ${(p) => (p.position == "left" && css`
        top: 50%;
        left: 0%;
        transform: translate(-105%, -50%);
    `)}


`;
const TourNavigationButton = styled.div<{ buttonBackgroundColor: string, buttonTextColor: string }>`
    display: flex;
    margin-top: 10px;

    .button{
        cursor: pointer;
        background-color: ${p => p.buttonBackgroundColor};
        color: ${p => p.buttonTextColor};
        border-radius: 5px;
        padding: 3px 6px;
        font-size: 12px;
        font-weight: bold;
        margin-right: 10px;
    }
`;

const TourContent = styled.div<{ backgroundColor: string }>`
    align-items: center;
    background-color: ${p => p.backgroundColor};
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    position: relative;
    max-width: 300px;
    width: max-content;

    &.right::before {
        content: "";
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 10px solid ${p => p.backgroundColor};;
    }

    &.bottom::before {
        content: "";
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid ${p => p.backgroundColor};;
    }

    &.left::before {
        content: "";
        position: absolute;
        right: -10px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid ${p => p.backgroundColor};;
    }


    &.top::before {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid ${p => p.backgroundColor};;
    }

    .close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        font-weight: bold;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }

    .close:hover {
        color: #ccc;
    }
`;