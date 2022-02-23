import React, { createContext, useCallback, useContext, useState } from 'react';
import Modal from '../components/Modal';

export interface ModalState {
  visible: boolean;
  loading?: boolean;
  title?: string;
  confirmButtonText?: string;
  component?: React.ReactNode;
  allowOutsideClick?: boolean;
  callback?(data?: any): Promise<void> | void;
}

interface ModalContextData {
  modalData: ModalState;
  showModal(modalData?: Omit<ModalState, 'visible'>): void;
  hideModal(): void;
  updateModal(modalData?: Omit<ModalState, 'visible'>): void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const INITIAL_MODAL_STATE: ModalState = {
  visible: false,
  title: '',
  loading: false,
  allowOutsideClick: true,
};

const ModalProvider: React.FC = ({ children }) => {
  const [modalData, setModalData] = useState<ModalState>(INITIAL_MODAL_STATE);

  const showModal = useCallback(
    (data: Omit<ModalState, 'visible'>) =>
      setModalData({ ...data, visible: true }),
    [],
  );

  const hideModal = useCallback(
    () => setModalData({ ...modalData, visible: false }),
    [modalData],
  );
  const updateModal = useCallback(
    (data: ModalState) => setModalData({ ...modalData, ...data }),
    [modalData],
  );
  return (
    <ModalContext.Provider
      value={{ modalData, showModal, hideModal, updateModal }}
    >
      {children}
      <Modal />
    </ModalContext.Provider>
  );
};

function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}

export { ModalProvider, useModal };
