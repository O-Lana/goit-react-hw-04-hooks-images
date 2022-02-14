import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.css';

const ImageGallery = ({ gallery, onModalShow }) => {

    return (
        <ul className="imageGallery">
            {gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
                return (
                    <ImageGalleryItem
                        key={id}
                        preview={webformatURL}
                        largeImage={largeImageURL}
                        tags={tags}
                        onModalShow={onModalShow}
                    />
                );
            })}
        </ul>
    );
};

export default ImageGallery;


ImageGallery.propTypes = {
    gallery: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.number.isRequired,
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        }))
        .isRequired,
    onModalShow: PropTypes.func.isRequired,
};