export interface ButtonProps {
  handleClick: () => void;
  backgroundColor?: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  handleClick,
  backgroundColor,
}) => {
  return (
    <button onClick={handleClick} style={{ backgroundColor }}>
      버튼
    </button>
  );
};

export default Button;
