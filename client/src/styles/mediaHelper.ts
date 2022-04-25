type BreakType = 'large' | 'medium';

interface BreakPointType {
  [key: string] : number
}

export const breakPoints: BreakPointType = {
  large: 1200,
  medium: 600,
}

const mediaQueryHelper = (n: BreakType) => 
  `@media (min-width: ${breakPoints[n]}px)`


export default mediaQueryHelper;
