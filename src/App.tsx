import React from 'react';
import './css/tailwind-base.css';
import './css/tailwind-components.css';
import './css/tailwind-utilities.css';
// import './tailwind.generated.css';
// import { Typography } from '@material-ui/core';

export const App = (): JSX.Element => (
   <div className="flex items-center max-w-sm p-6 mx-auto bg-white shadow-md rounded-xl space-x-4">
      <div className="flex-shrink-0">
         <div>demo</div>
      </div>
   </div>
);
