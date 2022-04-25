type TrimmerType = Array<string>;

const trimmer = (formData: TrimmerType) => {
  const existFalsy = formData.filter((str) => str.trim() === "");

  if (existFalsy.length > 0) {
    return false;
  }

  return true;
};

export default trimmer;
