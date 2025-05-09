import React, { useEffect } from 'react';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

// Потрібно зв'язати модальне вікно з кореневим елементом
Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onRequestClose();  // Закрити модальне вікно при натисканні ESC
      }
    };

    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);  // Очистка
    };
  }, [onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modalContent}
      overlayClassName={css.overlay}
      closeTimeoutMS={300}  // Плавне закриття
    >
      <div className={css.modalWrapper}>
        <img src={image?.largeImageURL} alt={image?.tags} className={css.modalImage} />
        <button onClick={onRequestClose} className={css.closeButton}>Закрити</button>
      </div>
    </Modal>
  );
};

export default ImageModal;