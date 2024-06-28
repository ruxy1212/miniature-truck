import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';
import Featured from './pages/Featured';
import HomePage from './pages/HomePage';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='movie/:id' element={<MovieDetail />} />
        <Route path='featured' element={<Featured />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;