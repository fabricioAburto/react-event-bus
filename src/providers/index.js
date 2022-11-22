import React, { useMemo } from 'react';
import { EventBusContext } from '../contexts';
import { EventBusBuilder } from '../event-bus';

export default function EventBusProvider({ children, eventBus, logPrefix, debug }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bus = useMemo(() => eventBus ?? EventBusBuilder({ debug: debug === true, logPrefix }), [eventBus]);
  return <EventBusContext.Provider value={bus}>{children}</EventBusContext.Provider>;
}
