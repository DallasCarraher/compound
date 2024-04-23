---
sidebar_position: 1
---

# Get Started

### 1. Create a React project

Start a [React](https://react.dev/) project. I typically reach for [Vite](https://vitejs.dev/).

### 2. Add the compound package

Next, install the [**@cmpd/compound**](https://www.npmjs.com/package/@cmpd/compound) package to start using the library.

```zsh
npm i @cmpd/compound
```

### 3. Import Stylesheet

- Import the CSS for **compound** to any stylesheet file that the component will import.

```css title="index.css"
@import url('@cmpd/compound.css');
```

### 4. Add the component to your JSX

```JSX title="App.jsx"
import { Compound } from '@cmpd/compound'
import './index.css'

export default function App() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Compound />
    </div>
)
}
```
