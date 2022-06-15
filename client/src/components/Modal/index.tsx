import React from 'react';
import useOutsideRef from '@/hooks/useOutsideRef';
import S from './StyledModal';

interface ModalProps {
  children: React.ReactElement;
  outsideClickHandler: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  outsideClickHandler,
}) => {
  const outsideRef = useOutsideRef(outsideClickHandler);

  return (
    <>
      <S.Container>
        <S.Article
          ref={outsideRef}
        >
          {children}
        </S.Article>
      </S.Container>
    </>
  );
};

export default Modal;
