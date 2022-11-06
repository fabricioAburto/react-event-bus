import { useEffect } from 'react';
import { useEventBus } from './useEventBus';

export function useBusEffectOn(event, cb) {
  const { listen } = useEventBus();

  useEffect(() => {
    const off = listen(event, cb);
    return () => {
      off();
    };
  }, [listen, event]);
}
