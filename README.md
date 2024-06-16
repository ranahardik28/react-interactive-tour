# react-tour

> React Tour is a lightweight and highly customizable library for creating interactive guided tours in your ReactJs and NextJs applications. Enhance user onboarding and feature discovery with step-by-step instructions and visually appealing tour components.

<br/>

### [**Live Demo**](https://shimmereffectreact.vercel.app/components/shimmerbutton)

<br/>

# Install

```
npm install react-tour
```

or

```
yarn add react-tour
```

<br/><br/>

# Key Features:

- Easy to Use: Simple component to create tours quickly.

- Highly Customizable: Customize the look and feel to match your application's design.

- Flexible Positioning: Position tooltips relative to elements with various options.

- Responsive Design: Ensure tours look great on all devices.

- Step Control: Control the flow of the tour with next, previous, and finish actions.

<br/><br/>

# How to use:

### Wrap entire react app into ReactTourProvider component :

```JSX
import MyCom from './Components/MyCom'
import ReactTourProvider from 'react-tour';

function App() {

  return (
    <>
        <ReactTourProvider cache={true}>
            <MyCom / >
        </ReactTourProvider>
    </>
  )
}

export default App

```

### Properties

| Property                | Type           | Required | Default Value      | Description                                          |
|-------------------------|----------------|----------|--------------------|------------------------------------------------------|
| `backgroundColor`       | `string`       | No       | `#fff`             | Background color of the tour overlay.                |
| `buttonTextColor`       | `string`       | No       | `#4285f4`             | Text color of the tour navigation buttons.           |
| `buttonBackgroundColor` | `string`       | No       | `#4285f4`          | Background color of the tour navigation buttons.     |
| `cache`                 | `boolean`      | Yes      | `false`            | Determines if the tour state should be cached.       |
| `children`              | `ReactElement` | Yes      | `-`                | The content or components that the provider wraps.   |




### Wrap ReactTour component to your component:

```JSX
import ReactTour from 'react-tour';
import {ShimmerButton} from "shimmer-effect-react";

function Page() {

  return (
    <>
        <ReactTour index={0} position='top' body={<div><strong>React Tour</strong><br />Welcome to react tour.</div>}>
            <ShimmerButton size='lg' mode="light" />
          </ReactTour>
    </>
  )
}

export default Page

```

### Properties

| Property  | Type                                  | Required | Default Value | Description                                     |
|-----------|---------------------------------------|----------|---------------|-------------------------------------------------|
| `index`   | `number`                              | Yes      | -             | The step index in the tour sequence.            |
| `position`| `"top" \| "right" \| "bottom" \| "left"` | Yes      | -             | The position of the tooltip relative to the target element. |
| `body`    | `ReactElement`                        | Yes      | -             | The content to display in the tooltip.          |
| `children`| `ReactElement`                        | Yes      | -             | The target element around which the tooltip will be displayed. |



<br/><br/>

# More Features Coming Soon:

Stay tuned for exciting updates and expansions to the `react-tour` library! Our team is hard at work developing additional components and features to further enhance your experience with react tour in React applications. Keep an eye on our roadmap for upcoming releases, and be the first to explore new functionalities as they become available.

<br/><br/>

# Contributions and Feedback:

We welcome contributions, bug reports, and feature requests from the community. Whether you're interested in submitting a pull request, reporting a bug, or sharing your ideas for enhancements, your input is invaluable in shaping the future of the `react-tour` library. Thank you for your support and collaboration!
