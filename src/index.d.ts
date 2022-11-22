import React from 'react';

export type EventHandler = (payload: any) => any;
export interface EventBus {
  bus: object;
  dispatch(key: string, payload: any): void;
  off(key: string, handler: EventHandler): void;
  once(key: string, handler: EventHandler): void;
  listen(key: string, handler: EventHandler): () => void;
}

export interface EventBusBuilderConfigs {
  debug: boolean;
  logPrefix?: string;
}

export type EventListenerCb = (payload: any) => void;

export function useEventBus(): EventBus;

export function useBusEffectOn(event: string, cb: (payload: any) => void): void;

export function EventBusBuilder(configs: EventBusBuilderConfigs): EventBus;

interface EventBusProviderProps extends EventBusBuilderConfigs {
  eventBus?: EventBus;
  children: React.ReactNode;
}

export default function EventBusProvider(props: EventBusProviderProps): EventBus;

export function useEventBus(): EventBus;
