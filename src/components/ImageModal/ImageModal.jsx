import React, { useEffect } from 'react';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onRequestClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modalContent}
      overlayClassName={css.overlay}
      closeTimeoutMS={300}
    >
      <div className={css.modalWrapper}>
        <img
          src={image?.urls?.regular}
          alt={image?.alt_description || 'image'}
          className={css.modalImage}
        />
        <button onClick={onRequestClose} className={css.closeButton}>
          Закрити
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;
