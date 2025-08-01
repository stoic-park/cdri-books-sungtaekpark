import { Link } from 'react-router-dom';

const Header = () => (
  <header className="p-4 border-b">
    <Link to="/" className="mr-4">
      도서 검색
    </Link>
    <Link to="/wishlist">찜한 책</Link>
  </header>
);

export default Header;
