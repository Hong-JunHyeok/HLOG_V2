type BreakType = 'huge' | 'large' | 'medium' | 'small';

interface BreakPointType {
  [key: string] : number
}

export const breakPoints: BreakPointType = {
  huge: 1440,
  large: 1170,
  medium: 768,
  small: 450,
}

const mediaQueryHelper = (n: BreakType) => 
  `@media (max-width: ${breakPoints[n]}px)`


export default mediaQueryHelper;
