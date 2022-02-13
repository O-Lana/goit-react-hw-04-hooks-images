import { useEffect, useState } from 'react';

// import { Component } from "react";
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
          setGallery(prevState => [...prevState, ...hits]);
          setCurrentHitsPerPage(hits.length);
          setIsLoading(false);
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
      setShowModal(!showModal);
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
  

    

  //*было
  // export default class App extends Component {
  // state = {
  //   searchImages: '',
  //   page: 1,
  //   isLoading: false,
  //   gallery: [],
  //   largeImage: '',
  //   showModal: false,
  //   currentHitsPerPage: null,
  // };

  
  // componentDidUpdate(_, prevState) {
  //   const { searchImages, page } = this.state;

  //   const prevSearch = prevState.searchImages;
  //   const prevPage = prevState.page;

  //   // if (nextPage > 1) {
  //   //   window.scrollTo({
  //   //     top: document.documentElement.scrollHeight,
  //   //     behavior: 'smooth',
  //   //   });
  //   // }

  //   if (prevSearch !== searchImages || prevPage !== page) {
  //     this.setState({isLoading: true})


  //     API
  //       .fetchImages(searchImages, page)
  //       .then(({ hits }) => {
  //         const images = hits.map(
  //           ({ id, webformatURL, largeImageURL, tags }) => {
  //             return { id, webformatURL, largeImageURL, tags };
  //           },
  //         );

          // if (images.length > 0) {
          //   this.setState(prevState => {
          //     return {
          //       gallery: [...prevState.gallery, ...images],
          //       isLoading: false,
          //       currentHitsPerPage: hits.length,
          //     };
          //   });
  //         } else {
  //           alert(`По запросу ${searchImages} ничего не найдено.`);
  //           this.setState({ isLoading: false });
  //         }
  //       })
  //       .catch(error => this.setState({ error }));
  //   }
  // }

  // handleFormSubmit = nextSearchImages => {
  //     this.setState({ searchImages: nextSearchImages, page: 1, gallery: [], currentHitsPerPage: null });
  //   };

  //  handleLoadMore = () => {
  //   this.setState(({ page }) => {
  //     return { page: page + 1 };  
  //   });
  //  };
  
  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  // onOpenImage = largeImage => {
  //   this.setState({ largeImage: largeImage});
  //     this.toggleModal();
  //   };
  
  //   render() {
  //     const { gallery, isLoading, currentHitsPerPage, error, showModal, largeImage } = this.state;

  //     return (
  //       <div className="app">
  //         <SearchBar onSubmit={this.handleFormSubmit} />

  //         {gallery.length > 0 && !error && (
  //           <>
  //             <ImageGallery gallery={gallery} onModalShow={this.onOpenImage} />
  //             {currentHitsPerPage && currentHitsPerPage < 12 && (
  //                 <p className="message">Конец результатов поиска</p>
  //             )}
  //           </>
  //         )}

  //         {currentHitsPerPage === 12 && !isLoading && (
  //           <Button onClickBtn={this.handleLoadMore} />
  //         )}

  //         {isLoading && <TailSpin ariaLabel="loading-indicator" color="#3f51b5" />}

  //         {showModal && <Modal image={largeImage} onClose={this.toggleModal} />}

  //       </div>
  //     );
  //   }
  // }