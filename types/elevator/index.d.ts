import Ember from 'ember';
import { Route } from '@ember/routing';

declare global {
  interface Array<T> extends Ember.ArrayPrototypeExtensions<T> {}
  // interface Function extends Ember.FunctionPrototypeExtensions {}
}

export type Resolved<P> = P extends Promise<infer T> ? T : P;
export type ModelFrom<R extends Route> = Resolved<ReturnType<R['model']>>;

export {};
