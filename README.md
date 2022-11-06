# react-event-bus 🚌

This is a simple react project for creating event-driven applications.

<div align="center">
  <img src="./docs/bus.png">
</div>

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

## How to integrate with my existed code?

To keep your code clean of implementations, it is proposed to create an adapter using a hoc:

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

    const handleOnItemClick = index => dispatch('redirect-to', index);

    return <Menu {...props} open={isOpen} onItemClick={handleOnItemClick} />;
  };
}
```

```jsx
export Menu from '.';

export default asideMenuAdapter(Menu);
```

## What if I want to create my own provider?

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
