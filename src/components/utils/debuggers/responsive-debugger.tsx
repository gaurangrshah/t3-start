import React from 'react';

const colors = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'pink',
  'brown',
  'black',
  'gray',
];

export const ResDebugger = ({ children }: { children: React.ReactNode }) => {
  const kids = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        ...child.props,
        outline: '5px solid',
        outlineColor: {
          base: colors[4],
          sm: colors[3],
          md: colors[2],
          lg: colors[1],
          xl: colors[0],
        },
      });
    }
  });
  return <>{kids}</>;
};
