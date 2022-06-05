import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';

const StyledLike = {
  Container: styled.div`
    display: flex;
    padding: 10px;
    svg {
        width: .8rem;
        height: .8rem;
        margin-right: 10px;
    }
  `,

  Section: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    border-right: 1px solid ${ColorSet['--greyOpacity300']};
    cursor: pointer;
    &:last-child {
      border: none;
    }
  `,

  Like: styled.div`
    .liked {
      color: ${ColorSet['--primary']};
    }
  `,

  Share: styled.div``,

  Viewer: styled.div``,

  LoginRequireModal: styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .require_content {
      font-size: 1.3rem;
     & > .decoration {
       color: ${ColorSet['--primary']};
       font-weight: bold;
     } 
    }
    button {
      margin-top: 1rem;
      width: 50px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${ColorSet['--white']};
      background-color: ${ColorSet['--primary']};
      border-radius: 10px;
    }
  `,
};

export default StyledLike;
