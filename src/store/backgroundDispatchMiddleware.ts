import { AnyAction, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { dispatchActionToBackground } from '../backgroundConnection';

export const backgroundDispatchMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (
  action: AnyAction
) => {
  dispatchActionToBackground(action)
    .then(() => null)
    .catch((error) => {
      console.error('Error dispatching action to background:', error);
    });

  return next(action);
};
