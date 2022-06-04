import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';

const StyledLike = {
  Container: styled.div`
    display: flex;
    padding: 10px;
    border: 1px solid ${ColorSet['--greyOpacity100']};
    svg {
        width: .8rem;
        height: .8rem;
        margin-right: 10px;
    }
  `,

  Section: styled.div`
    padding: 0 1rem;
    border-right: 1px solid ${ColorSet['--greyOpacity100']};
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
};

export default StyledLike;
