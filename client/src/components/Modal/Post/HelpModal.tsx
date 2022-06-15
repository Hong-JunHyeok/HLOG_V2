import styled from '@emotion/styled';
import ShortCut from '@/../public/assets/HLOG_Shortcut.001.png';

const StyledHelpModal = {
  Container: styled.div`
    display: flex;
    align-items: flex-end;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    img {
      user-select: none;
      width: 900px;
      height: 500px;
    }
  `,
};

const HelpModal = () => (
  <StyledHelpModal.Container>
    <img src={ShortCut} alt="" width={500} height={300} draggable={false} />
  </StyledHelpModal.Container>
);

export default HelpModal;
