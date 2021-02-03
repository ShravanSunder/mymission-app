import { css } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';

export interface ILayoutProps {
   children: JSX.Element;
   className?: string;
   sx?: Array<CSSInterpolation> | CSSInterpolation | TemplateStringsArray;
}

export const getLayoutProps = (props: ILayoutProps): { classNameProp: string; cssProp: any } => {
   const classNameProp = ` ${props.className ?? ''}`;
   const cssProp = css(props.sx as any);
   return { cssProp, classNameProp };
};
