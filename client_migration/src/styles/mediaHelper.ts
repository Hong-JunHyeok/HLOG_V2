type BreakType = 'huge' | 'large' | 'medium' | 'small';

interface BreakPointType {
  [key: string] : number
}

export const breakPoints: BreakPointType = {
  huge: 1440,
  large: 1100,
  medium: 650,
  small: 450,
}

const mediaQueryHelper = (n: BreakType) => 
  `@media (min-width: ${breakPoints[n]}px)`


export default mediaQueryHelper;
