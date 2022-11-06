export function EventBusBuilder({ debug, logPrefix }) {
  const bus = {};
  const logger = console.log;
  const prefix = `[${logPrefix ?? 'unknown'}][EventBus]`;

  const off = (key, handler) => {
    const index = bus[key]?.indexOf(handler) ?? -1;
    bus[key]?.splice(index >>> 0, 1);
  };

  const listen = (event, handler) => {
    log('[New Susbscription]: ' + event);
    if (bus[event] === undefined) bus[event] = [];
    bus[event].push(handler);
    return () => off(event, handler);
  };

  const dispatch = (event, payload) => {
    log('[Dispatch]: ' + event, payload);
    log('Bus: ', bus);
    if (bus[event] !== undefined) bus[event].forEach(fn => fn(payload));
  };

  const once = (key, handler) => {
    const handleOnce = payload => {
      handler(payload);
      off(key, handleOnce);
    };
    listen(key, handleOnce);
  };

  const log = (...args) => {
    if (debug) logger(prefix, ...args);
  };

  return { listen, dispatch, once, off, bus };
}
