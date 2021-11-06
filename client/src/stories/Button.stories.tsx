import Button from "../components/Button";

export default {
  title: "Component/Button",
  component: Button,
};

export const defaultButton = () => {
  return <Button handleClick={() => {}}>기본 버튼</Button>;
};

defaultButton.story = {
  name: "Default Buttn",
};
