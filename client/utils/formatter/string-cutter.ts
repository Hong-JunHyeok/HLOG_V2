type ReturnTypes = {
  cuttedString: string;
  isCutted: boolean;
};

function stringCutter(str: string, endIndex: number): ReturnTypes {
  const cuttedString = `${str.slice(0, endIndex)}...`;
  let isCutted = true;

  if (cuttedString === str) {
    isCutted = false;
  }

  return { cuttedString, isCutted };
}

export default stringCutter;
