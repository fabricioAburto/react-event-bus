import { useEffect } from 'react';
import { useEventBus } from './useEventBus';

export function useBusEffectOn(event, cb) {
  const { listen } = useEventBus();
  useEffect(() => listen(event, cb), [listen, event, cb]);
}
