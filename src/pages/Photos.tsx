import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const PHOTOS_API = 'https://jsonplaceholder.typicode.com/photos';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Photos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPhotosToShow, setTotalPhotosToShow] = useState(50);
  const photosPerPage = 10;

  useEffect(() => {
    const fetchPhotos = async () => {
      const startIndex = currentPage * photosPerPage;
      const photosResponse = await fetch(`${PHOTOS_API}?_start=${startIndex}&_limit=${photosPerPage}`);
      const photosData = await photosResponse.json();

      setPhotos(photosData);
    };

    fetchPhotos();
  }, [currentPage, totalPhotosToShow]);

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleTotalPhotosToShowChange = (e: { target: { value: string; }; }) => {
    const newTotalPhotosToShow = parseInt(e.target.value);
    setTotalPhotosToShow(newTotalPhotosToShow);
  };

  const pageCount = Math.ceil(totalPhotosToShow / photosPerPage);

  return (
    <div className='photos-page'>
      <div className='container'>
        <div>
          <label htmlFor='totalPhotos'>Total Photos to Show:</label>
          <input
            type='number'
            id='totalPhotos'
            min='1'
            value={totalPhotosToShow}
            onChange={handleTotalPhotosToShowChange}
          />
        </div>
        {photos.map((photo) => {
          return (
            <img src={photo.thumbnailUrl} key={photo.id} alt={photo.title} />
          )
        })}
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  )
}

export default Photos;