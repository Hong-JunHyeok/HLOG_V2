const stringCutter = (str: string, cutNumber?: number, endChar: string = '...') => {
  if(str.length <= cutNumber) return str;

  return `${str.slice(0, cutNumber)}${endChar}`;
}

export default stringCutter;
