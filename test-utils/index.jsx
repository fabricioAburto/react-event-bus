import React from 'react';
import { render } from '@testing-library/react';
import EventBusProvider from '../dist';

const AllTheProviders = ({ children }) => {
  return <EventBusProvider>{children}</EventBusProvider>;
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
