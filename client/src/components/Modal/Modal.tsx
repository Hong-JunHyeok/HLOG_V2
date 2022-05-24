import React from 'react';
import ModalPortal from './ModalPortal';
import S from './StyledModal';

interface ModalProps {
  children: any,
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <ModalPortal>
      <S.Container>
        <S.Article>
          {children}
        </S.Article>
      </S.Container>
    </ModalPortal>
  )
}

export default Modal;
