import React, { useRef } from 'react';
import { FiX } from 'react-icons/fi';

import HashLoader from 'react-spinners/HashLoader';

import { useModal } from '../../hooks/modal';
import useOutsideClick from '../../utils/useOutsideClick';
import Button from '../Button';

import { Wrapper, ModalContainer, Content, LoaderContent } from './styles';

const Modal: React.FC = () => {
  const { modalData, hideModal } = useModal();

  /**
   * Modal Ref
   */
  const modalRef = useRef(null);

  useOutsideClick(modalRef, () => {
    if (modalData.visible && modalData.allowOutsideClick) {
      hideModal();
    }
  });

  return (
    <Wrapper visible={modalData.visible}>
      <ModalContainer ref={modalRef}>
        {modalData.loading ? (
          <LoaderContent>
            <HashLoader color="#21E6C1" />
            <span>Aguarde...</span>
          </LoaderContent>
        ) : (
          <>
            <header>
              <h4>{modalData.title}</h4>
              <button onClick={hideModal}>
                <FiX />
              </button>
            </header>
            <Content>
              {!!modalData.component && <>{modalData.component}</>}
              <div className="actions">
                <Button onClick={hideModal}>FECHAR</Button>
                <Button color="accent" onClick={modalData.callback}>
                  {modalData.confirmButtonText
                    ? modalData.confirmButtonText
                    : 'CONFIRMAR'}
                </Button>
              </div>
            </Content>
          </>
        )}
      </ModalContainer>
    </Wrapper>
  );
};

export default Modal;
