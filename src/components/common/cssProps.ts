import { css } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';

export interface ICssProps {
   children: JSX.Element;
   className?: string;
   cssProp?: Array<CSSInterpolation> | CSSInterpolation | TemplateStringsArray;
}

export const getCssProps = (props: ICssProps): { classNameProp: string; cssProp: any } => {
   const classNameProp = ` ${props.className ?? ''}`;
   const cssProp = css(props.cssProp as any);
   return { cssProp, classNameProp };
};
