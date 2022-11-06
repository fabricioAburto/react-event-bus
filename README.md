# react-event-bus 🚌

This is a simple project for creating react applications using **event-driven architecture**.

![Bus Image](./docs/bus.png)

## Installation

```bash
$ npm install @joseaburto/react-event-bus   # for yarn users
$ yarn add @joseaburto/react-event-bus      # for yarn users
```

## How to use it?

Just wrap your application with the provider.

```jsx
// src/index.js

import ReactDOM from 'react-dom/client';
import EventBusProvider from '@joseaburto/react-event-driven';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <EventBusProvider>
    <App />
  </EventBusProvider>,
);
```

---

<br >

## Benefits

- Very simple to use
- Stop creating very components

<br >

## How to integrate with my existing code?

To keep your code clean with any code implementation, it is proposed to create an adapter using a hoc:

```jsx
import { useEvenBus, useBusEffectOn } from '@joseaburto/react-event-driven';

/**
 * Adapt a given Menu Component to work with event-driven.
 */
export default asideMenuAdapter(Menu);
{
  return function (props) {
    const { dispatch } = useEventBus();
    const [isOpen, setOpen] = useState(true);

    useBusEffectOn('togle-menu', val => setState(pre => !pre));

    // You need a subscriber to this. Maybe react-router-dom
    const handleOnItemClick = index => dispatch('redirect-to', index);

    return <Menu {...props} open={isOpen} onItemClick={handleOnItemClick} />;
  };
}
```

```jsx
export Menu from '.';

export default asideMenuAdapter(Menu);
```

<br >

## What if I want to create my own provider or impl?

Well, that is an easy tasks. The key here is the bus, so you just need a new
bus instance and a new context. Check the example:

```jsx
import { EventBusBuilder } from '@libs/event-bus';
import { useMemo, createContext, useContext } from 'react';

// Your Context
const Context = createContext();

// Your Provider
export function EventDrivenComponentProvider({ children, debug, logPrefix }) {
  // Your Memo New Bus Instance
  const bus = useMemo(() => EventBusBuilder({ debug: debug === true, logPrefix }), []);
  return <Context.Provider value={bus}>{children}</Context.Provider>;
}

// Your Hook
export function useEventDrivenComponent() {
  return useContext(Context);
}

// Your Hook Effect
export function useEventDrivenComponentEffect(event, cb) {
  const { listen } = useEventDrivenComponent();
  useEffect(() => {
    const off = listen(event, cb);
    return () => {
      off();
    };
  }, [listen, event]);
}
```

With this you have just created your new API for your specific context using event-driven with the bus.

<br >

## Contributing

Please see the [Contributing Guidelines](./CONTRIBUTING.md).

<br >

## Author

- [Jose Aburto](https://www.linkedin.com/in/jose-aburto/)
