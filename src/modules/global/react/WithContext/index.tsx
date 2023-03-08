import { ComponentType } from 'react';

export const withContext = <T,>(
  Provider: ComponentType<T>,
  Component: ComponentType
): ComponentType<T> => {
  return function (props) {
    return (
      <Provider {...props}>
        <Component />
      </Provider>
    );
  };
};
