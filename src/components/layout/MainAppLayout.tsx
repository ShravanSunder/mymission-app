import { css } from '@emotion/react';
import codegen from 'codegen.macro';
import { useIntl } from 'react-intl';
import tw from 'twin.macro';

import { ContentLayout } from './ContentLayout';
import { NavigationBottom, NavigationRight } from './Navigation';

// import { macro } from '~~/helpers/macro';
import { cssMq } from '~~/styles/theme';

export const macro = (input: string, data: any): any => {
   return codegen`formatMessage({id: 10, defaultMessage:"sdfdsfdsf}, {})`;
};

export const toolbarHeight = css([{ label: 'toolbarHeight' }, tw`h-14`]);
export const panelHeight = css([{ height: 'calc(100vh - 4.7rem)', label: 'panelHeight' }]);

export const MainAppLayout = (): JSX.Element => {
   const mainView = <ContentLayout></ContentLayout>;
   const { formatMessage } = useIntl();

   const gridTemplate = css([
      cssMq({
         gridTemplateRows: ['auto min-content', 'auto min-content', 'auto 0'],
         gridTemplateColumns: ['0 auto', '0 auto', 'min-content auto'],
      }),
      tw`grid-cols-2 gap-2 grid-rows-2`,
   ]);

   return (
      <div css={[{ height: '100vh', width: '100vw', overflow: 'hidden' }]} className="p-1 grid grid-rows-1 grid-cols-1 box-border">
         <>
            <div>kjlkljl</div>
            <div>{macro('sdfdsfdsfs', {})}</div>
            {/* <div className="grid container-fill-viewport-full " css={gridTemplate}>
               <div className="p-1 container-fill-viewport-full row-start-1 col-start-1">
                  <NavigationRight></NavigationRight>
               </div>
               <div className="container-fill-viewport-full row-start-1 col-start-2">{mainView}</div>
               <div className="p-1 container-fill-viewport-full row-start-2 col-start-1 col-span-2">
                  <NavigationBottom></NavigationBottom>
               </div>
            </div> */}
         </>
      </div>
   );
};
