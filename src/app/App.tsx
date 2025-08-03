import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import Layout from '../shared/components/Layout';
import SearchBook from '../pages/SearchPage';
import WishList from '../pages/WishlistPage';

const App = () => {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SearchBook />} />
            <Route path="/wishlist" element={<WishList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  );
};

export default App;
