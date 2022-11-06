import { useContext } from 'react';
import { EventBusContext } from '../contexts';

export function useEventBus() {
  return useContext(EventBusContext);
}
