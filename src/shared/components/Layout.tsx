import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => (
  <div className="w-full max-w-[1920px] mx-auto min-h-screen bg-white">
    <Header />
    <main className="max-w-screen-lg mx-auto flex flex-col gap-lg p-lg">
      <Outlet />
    </main>
  </div>
);

export default memo(Layout);
