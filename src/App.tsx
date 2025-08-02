import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import Layout from './components/layout/Layout';
import SearchBook from './pages/SearchBook';
import WishList from './pages/WishList';

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
