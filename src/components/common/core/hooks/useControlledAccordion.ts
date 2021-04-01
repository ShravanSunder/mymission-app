import { SyntheticEvent, useState } from 'react';

export const useControlledAccordion = (): ((
   accordionName: string
) => {
   expanded: boolean;
   onChange: (event: SyntheticEvent, isExpanded: boolean) => void;
   'aria-controls': string;
}) => {
   const [expandedAccordion, setExpandedPanel] = useState('');
   const handleAccordionChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpandedPanel(isExpanded ? panel : '');
   };

   const getAccordionProps = (accordionName: string) => ({
      expanded: expandedAccordion === accordionName,
      onChange: handleAccordionChange(accordionName),
      'aria-controls': accordionName,
   });

   return getAccordionProps;
};
