import React from 'react';

export const CardLayout = ({ children }: { children: JSX.Element }): JSX.Element => {
   return <div className="flex-grow border-gray-500 shadow-md elevation-2 border-1 fill-parent rounded-md">{children}</div>;
};
