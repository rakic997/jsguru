import { Link } from 'react-router-dom';

const Header = () => {
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
    </header>
  )
}

export default Header;