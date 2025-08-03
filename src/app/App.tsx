import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../shared/components/Layout';
import SearchBook from '../pages/SearchPage';
import WishList from '../pages/WishlistPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchBook />} />
          <Route path="/wishlist" element={<WishList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
