import { Routes, Route } from 'react-router-dom';

import Posts from './pages/Posts';
import Photos from './pages/Photos';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/photos' element={<Photos />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
