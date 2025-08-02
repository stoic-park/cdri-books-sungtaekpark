import { Link, useLocation } from 'react-router-dom';
import Typography from '../common/Typography';

const Header = () => {
  const location = useLocation();
  const isSearchActive = location.pathname === '/';
  const isWishlistActive = location.pathname === '/wishlist';

  return (
    <header className="flex justify-center items-center p-xl relative">
      <Typography variant="title1" color="black" className="absolute left-xl">
        CERTICOS BOOKS
      </Typography>

      <nav className="flex gap-4 sm:gap-6 lg:gap-8">
        <Link
          to="/"
          className={isSearchActive ? 'border-b-2 border-primary pb-1' : ''}
        >
          <Typography
            variant="body1"
            color={isSearchActive ? 'primary' : 'text-secondary'}
            className={isSearchActive ? 'font-bold' : ''}
          >
            도서 검색
          </Typography>
        </Link>

        <Link
          to="/wishlist"
          className={isWishlistActive ? 'border-b-2 border-primary pb-1' : ''}
        >
          <Typography
            variant="body1"
            color={isWishlistActive ? 'primary' : 'text-secondary'}
            className={isWishlistActive ? 'font-bold' : ''}
          >
            찜한 책
          </Typography>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
