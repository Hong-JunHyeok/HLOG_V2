import React from 'react';
import ModalPortal from './ModalPortal';
import S from './StyledModal';

interface ModalProps {
  children: React.ReactNode;
  visible?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, visible = false }) => (
  <ModalPortal>
    {visible
      ? (
        <S.Container>
          <S.Article>
            {children}
          </S.Article>
        </S.Container>
      )
      : null}

  </ModalPortal>
);

export default Modal;
