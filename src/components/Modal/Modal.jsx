import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, WorkSpace } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ onModalClose, image }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEvents);
  });

  function handleEvents(event) {
    if (event.key === 'Escape' || event.currentTarget === event.target) {
      window.removeEventListener('keydown', handleEvents);
      onModalClose();
    }
  }

  return createPortal(
    <Overlay onClick={handleEvents}>
      <WorkSpace>
        <img src={image} alt="" />
      </WorkSpace>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
