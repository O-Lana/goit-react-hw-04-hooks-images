import { useEffect} from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, image, tags }) {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        };
    });

    const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
    };

    const handleOverlayClick = event => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

        return createPortal(
            <div className="overlay" onClick={handleOverlayClick}>
                <div>
                    <img src={image} alt={tags} className="modal"  />
                </div>
            </div>,
            modalRoot,
        );
}
