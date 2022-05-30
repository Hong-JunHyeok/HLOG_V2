import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';

const StyledModal = {
  Container: styled.div`
    z-index: 999;
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
    position: absolute;
    bottom: 0;
  `,
};

export default StyledModal;
