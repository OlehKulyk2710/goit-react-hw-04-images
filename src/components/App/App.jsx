import { useState, useEffect } from 'react';
import pixabayApi from '../../services/pixabay_api';
import { Watch } from 'react-loader-spinner';
import { AppContainer } from './App.styled';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [query, setQuery] = useState('');
  const [isQueryCorrect, setIsQueryCorrect] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [btnState, setBtnState] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!query) return;

    setBtnState(false);
    setIsLoading(true);
    setTotalPages(0);
    setError('');

    function handleData(parsedData) {
      const { total, hits } = parsedData;

      if (total === 0) {
        setIsQueryCorrect(false);
        return;
      }

      if (pageNumber === 1) {
        setData(hits);
      } else {
        setData(prevState => [...prevState, ...hits]);
      }

      setTotalPages(total);
      setIsQueryCorrect(true);
    }

    pixabayApi({ query, pageNumber })
      .then(res => res.json())
      .then(res => {
        handleData(res);
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, pageNumber]);

  useEffect(() => {
    if (!pageNumber) return;

    const pagesToShow = Math.ceil((totalPages - pageNumber * 12) / 12);
    pagesToShow >= 1 ? setBtnState(true) : setBtnState(false);
  }, [totalPages, pageNumber]);

  function onSubmit(newQuery) {
    if (query === newQuery) return;

    setQuery(newQuery);
    setPageNumber(1);
    setData([]);
    setIsQueryCorrect(true);
  }

  function handleBtnClick() {
    setPageNumber(prevState => prevState + 1);
  }

  const handleModalState = (image = '') => {
    setModalImage(image);
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <>
      <AppContainer>
        <Searchbar onSubmit={onSubmit} />
        {error && <p>{error}</p>}
        {query && (
          <ImageGallery
            data={data}
            isQueryCorrect={isQueryCorrect}
            onModalState={handleModalState}
            isModalOpen={isModalOpen}
          />
        )}
        {btnState && <Button onBtnClick={handleBtnClick} />}
        {isLoading && (
          <Loader>
            <Watch color="#4d5eb3" />
          </Loader>
        )}
        {isModalOpen && (
          <Modal image={modalImage} onModalClose={handleModalState} />
        )}
      </AppContainer>
      <Toaster position="top-left" />
    </>
  );
};
