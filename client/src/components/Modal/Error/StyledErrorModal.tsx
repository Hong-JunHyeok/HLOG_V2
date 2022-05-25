import ColorSet from "@/styles/colorSet";
import styled from "@emotion/styled";

const StyledErrorModal = {
  Container: styled.div`
    display: flex;
    align-items: flex-end;
    align-items: center;
    flex-direction: column;
    width: 400px;
    padding: 1rem;
    .info {
      width: 100%;
      text-align: center;
    }
    .title {
      font-weight: bold;
      font-size: 24px;
    }
    .message {
      font-weight: lighter;
      line-height: 2rem;
    }
  `,
  CloseButton: styled.button`
    display: flex;
    color: ${ColorSet['--white']};
    background-color: ${ColorSet['--red600']};
    padding: 1rem;
    padding: .5rem 1rem;
    border-radius: 5px;
    margin-top: 1rem;
    font-weight: bold;
  `
}

export default StyledErrorModal;
