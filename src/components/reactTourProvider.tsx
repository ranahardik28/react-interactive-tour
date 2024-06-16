"use client";
import React, { createContext, ReactElement, useEffect, useState } from 'react'

type ReactTourProviderType = {
    backgroundColor?: string,
    buttonTextColor?: string,
    buttonBackgroundColor?: string,
    cache: boolean,
    children: ReactElement,
}

interface ReactTourContextType {
    currentIndex: number | undefined,
    indexes: number[],
    backgroundColor: string,
    buttonTextColor: string,
    buttonBackgroundColor: string,
    setIndexes: React.Dispatch<React.SetStateAction<number[]>>,
    Next: () => void,
    Previous: () => void,
    Done: () => void,
}

const ReactTourContextDefaultValues = {
    currentIndex: undefined,
    indexes: [],
    backgroundColor: "#4285f4",
    buttonTextColor: "#4285f4",
    buttonBackgroundColor: "white",
    setIndexes: () => { },
    Next: () => { },
    Previous: () => { },
    Done: () => { }
};

export const ReactTourContext = createContext<ReactTourContextType>(ReactTourContextDefaultValues);

export default function ReactTourProvider({ backgroundColor, buttonBackgroundColor, buttonTextColor, cache, children }: ReactTourProviderType) {

    const [index, setIndex] = useState<number | undefined>(undefined);

    const [indexes, setIndexes] = useState<number[]>([]);

    useEffect(() => {
        if (indexes.length > 0) {
            cacheData();
        }
    }, [indexes])

    function cacheData() {

        if (cache) {

            const data = localStorage.getItem("ReactTourData");

            if (data == null) {
                localStorage.setItem("ReactTourData", JSON.stringify({ currentIndex: 0, isTourCompleted: false }));
            }

            const newData = localStorage.getItem("ReactTourData");
            const parsedData = JSON.parse(newData!);


            if (parsedData.isTourCompleted) {
                setIndex(undefined);
            } else {
                setIndex(parsedData.currentIndex);
            }

        } else {
            setIndex(0);
        }

    }


    const Previous = () => {
        if (index != undefined) {
            setIndex(index - 1);

            if (cache) {
                const data = localStorage.getItem("ReactTourData");
                const parsedData = JSON.parse(data!);
                parsedData.currentIndex = index - 1;
                localStorage.setItem("ReactTourData", JSON.stringify(parsedData));
            }

        }
    }

    const Next = () => {
        if (index != undefined) {
            setIndex(index + 1);

            if (cache) {
                const data = localStorage.getItem("ReactTourData");
                const parsedData = JSON.parse(data!);
                parsedData.currentIndex = index + 1;
                localStorage.setItem("ReactTourData", JSON.stringify(parsedData));
            }
        }
    }

    const Done = () => {
        if (index != undefined) {
            if (cache) {
                const data = localStorage.getItem("ReactTourData");
                const parsedData = JSON.parse(data!);
                parsedData.currentIndex = index + 1;
                parsedData.isTourCompleted = true;
                localStorage.setItem("ReactTourData", JSON.stringify(parsedData));
                setIndex(undefined);
            } else {
                setIndex(undefined);
            }
        }
    }

    return (
        <ReactTourContext.Provider value={{
            currentIndex: index,
            indexes: indexes,
            backgroundColor: backgroundColor ? backgroundColor : ReactTourContextDefaultValues.backgroundColor,
            buttonBackgroundColor: buttonBackgroundColor ? buttonBackgroundColor : ReactTourContextDefaultValues.buttonBackgroundColor,
            buttonTextColor: buttonTextColor ? buttonTextColor : ReactTourContextDefaultValues.buttonTextColor,
            setIndexes: setIndexes,
            Next: Next,
            Previous: Previous,
            Done: Done
        }}>
            {children}
        </ReactTourContext.Provider>
    )
}