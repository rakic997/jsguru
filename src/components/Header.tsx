import { useLocation, Link } from 'react-router-dom';
import { PostsContext } from '../context/PostsContext';
import { useContext } from 'react';

const Header = () => {
  const { setSearchQuery } = useContext(PostsContext);
  const location = useLocation();

  const handleSearch = (e: { target: { value: any; }; }) => {
    setSearchQuery(e.target.value);
  };

  const isPostsPage = location.pathname === '/';

  return (
    <header className='header'>
      <div className='logo'>
        <h1>Logo</h1>
      </div>
      <ul className='navigation'>
        <li>
          <Link to='/'>Posts</Link>
        </li>
        <li>
          <Link to='/photos'>Photos</Link>
        </li>
      </ul>
      {isPostsPage && (
        <input type='text' onChange={handleSearch} placeholder='Search posts by user name' />
      )}
    </header>
  )
}

export default Header;