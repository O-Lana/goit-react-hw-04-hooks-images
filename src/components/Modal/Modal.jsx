// import { Component } from 'react';
import { useEffect} from 'react';

import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({onClose, image, tags}) {

    const handleKeyDown = e => {
        if (e.code === 'Escape') {
           onClose();
        }
    }

    const handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
           onClose();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    });
    

        return createPortal(
            <div className="overlay" onClick={handleOverlayClick}>
                <div>
                    <img src={image} alt={tags} className="modal"  />
                </div>
            </div>,
            modalRoot,
        );
}



// const modalRoot = document.querySelector('#modal-root');

// export default class Modal extends Component {
//     componentDidMount() {
//         window.addEventListener('keydown', this.handleKeyDown)
//     }

//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.handleKeyDown)
//     }
    
//     handleKeyDown = e => {
//         if (e.code === 'Escape') {
//             this.props.onClose();
//         }
//     }

//     handleOverlayClick = e => {
//         if (e.currentTarget === e.target) {
//             this.props.onClose();
//         }
//     }

//     render() {
//         return createPortal(
//             <div className="overlay" onClick={this.handleOverlayClick}>
//                 <div>
//                     <img src={this.props.image} alt={this.props.tags} className="modal"  />
//                 </div>
//             </div>,
//             modalRoot,
//         );
//     }
// }