import { useState, useEffect, ChangeEvent } from 'react';
import ReactPaginate from 'react-paginate';

import { PhotoType } from '../types/types';

import Loader from '../components/Loader';

const Photos = () => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [totalPhotos, setTotalPhotos] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const perPage = 12;

  useEffect(() => {
    fetchData();
  }, [totalPhotos]);

  useEffect(() => {
    setCurrentPage(0);
  }, [totalPhotos]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${totalPhotos}`);
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleTotalPhotosChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTotalPhotos(parseInt(event.target.value, 10));
  };

  const offset = currentPage * perPage;
  const pageCount = Math.ceil(photos.length / perPage);

  return (
    <div className='photos-page'>
      <div className='container'>
        <div className='photos-limit-input'>
          <label htmlFor='totalPhotos'>Total number of photos:</label>
          <input
            type='number'
            id='totalPhotos'
            value={totalPhotos}
            onChange={handleTotalPhotosChange}
            min='1'
            max='5000'
          />
        </div>
        <div className='photos-container'>
          {loading ? (
            <Loader />
          ) : (
            photos.slice(offset, offset + perPage).map((photo: PhotoType) => (
              <img src={photo.thumbnailUrl} key={photo.id} alt={photo.title} />
            ))
          )}
        </div>
        <ReactPaginate
          previousLabel='Prev'
          nextLabel='Next'
          breakLabel='...'
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName='pagination'
          activeClassName='active'
          previousClassName={currentPage === 0 ? 'disabled' : ''}
          nextClassName={currentPage === pageCount - 1 ? 'disabled' : ''}
        />
      </div>
    </div>
  );
}

export default Photos;