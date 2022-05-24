import ColorSet from "@/styles/colorSet";
import styled from "@emotion/styled";

const StyledModal = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    background-color: rgba(0,0,0,0.3);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `,
  Article: styled.div`
    flex-shrink: 0;
    border-radius: 10px;
    background-color: ${ColorSet['--white']};
  `
};

export default StyledModal;
