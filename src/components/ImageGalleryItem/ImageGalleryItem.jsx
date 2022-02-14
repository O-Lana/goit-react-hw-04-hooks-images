import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

const ImageGalleryItem = ({preview, largeImage, tags, onModalShow}) => {
    return (
        <li className="imageGalleryItem">
            <img
                src={preview}
                alt={tags}
                onClick={() => onModalShow(largeImage)}
                className="imageGalleryItem-image"
            />
        </li>
    );
};

export default ImageGalleryItem;


ImageGalleryItem.propTypes = {
    tags: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    onModalShow: PropTypes.func.isRequired,
};