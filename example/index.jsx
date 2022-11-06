import React, { useState } from 'react';
import 'react-app-polyfill/ie11';
import ReactDOM from 'react-dom/client';

import EventBusProvider, { useEventBus, useBusEffectOn } from '../dist';

const MyLabel = () => {
  const [state, setState] = useState('');
  useBusEffectOn('print', val => setState(val));
  return <h1>{state}</h1>;
};

const MyLabel3 = () => {
  return <h1>{Date.now()}</h1>;
};

const App = () => {
  const { dispatch, bus } = useEventBus();
  return (
    <div title="Pepex">
      <button
        onClick={() => {
          console.log(bus);
          dispatch('print', Date.now());
        }}
      >
        Click
      </button>
      <MyLabel />
      <MyLabel3 />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <EventBusProvider debug logPrefix="test">
    <App />
  </EventBusProvider>,
);
