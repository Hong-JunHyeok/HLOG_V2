import React from 'react';
import ModalPortal from './ModalPortal';
import S from './StyledModal';
import useModal from '@/hooks/useModal';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const { isOpen } = useModal();

  return (
    <ModalPortal>
      {isOpen
        && (
          <S.Container>
            <S.Article>
              {children}
            </S.Article>
          </S.Container>
        )}
    </ModalPortal>
  );
};

export default Modal;
