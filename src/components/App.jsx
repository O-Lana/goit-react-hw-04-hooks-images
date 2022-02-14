import { useEffect, useState } from 'react';
import API from '../services/Api';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import {TailSpin} from 'react-loader-spinner';
import './App.css';


export default function App() {
  const [searchImages, setSearchImages] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentHitsPerPage, setCurrentHitsPerPage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!searchImages || !page) {
      return;
    };

    setIsLoading(true);
    
    API
      .fetchImages(searchImages, page)
      .then(({ hits }) => {
        const images = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          },
        );

        if (images.length > 0) {
          setGallery(prevState => [...prevState, ...images]);
          setCurrentHitsPerPage(hits.length);
          setIsLoading(false);
        } else {
          alert(`По запросу ${searchImages} ничего не найдено.`);
          setIsLoading(false);

        }
      })
      .catch(error => setError(error));
      
  }, [page, searchImages]);
  

    const handleFormSubmit = searchImages => {
      setSearchImages(searchImages);
      setPage(1);
      setGallery([]);
      setCurrentHitsPerPage(null);
    };

    const handleLoadMore = () => {
      setPage(prevState => (prevState + 1)
      );
    };
  
    const toggleModal = () => {
      setShowModal(showModal => !showModal);
    };

    const onOpenImage = largeImage => {
      setLargeImage(largeImage);
        toggleModal();
    };
  

  return (
        <div className="app">
          <SearchBar onSubmit={handleFormSubmit} />

          {gallery.length > 0 && !error && (
            <>
              <ImageGallery gallery={gallery} onModalShow={onOpenImage} />
              {currentHitsPerPage && currentHitsPerPage < 12 && (
                  <p className="message">Конец результатов поиска</p>
              )}
            </>
           )}

          {currentHitsPerPage === 12 && !isLoading && (
            <Button onClickBtn={handleLoadMore} />
          )}

          {isLoading && <TailSpin ariaLabel="loading-indicator" color="#3f51b5" />}

          {showModal && <Modal image={largeImage} onClose={toggleModal} />}

        </div>
      );

};
