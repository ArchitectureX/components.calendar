# @architecturex/components.for

## For

The `For` component is a utility component for React, designed to simplify the process of rendering lists. It takes an array of items and a child rendering function, and renders each item according to the provided function.

The For component is built with TypeScript and provides generic type support to ensure type safety.

### Installation

`npm install @architecturex/components.for`

### Props

- **each:** An array of items to be rendered.
- **children:** A render function that takes an item and its index as arguments.

### Usage

```javascript
import For from '@architecturex/components.for'

const MyComponent = () => {
  const items = ['Item 1', 'Item 2', 'Item 3']

  return (
    <div>
      <For each={items}>
        {(item, index) => <div key={index}>{item}</div>}
      </For>
    </div>
  )
}

export default MyComponent;
```

### Contribution

Feel free to suggest improvements, report issues, or contribute to enhancing these components. Your feedback and contributions are welcome!
