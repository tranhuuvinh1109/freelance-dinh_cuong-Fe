import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <nav className="z-50 bg-white  fixed top-0 left-0 right-0 border-b ">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 ">
        <div className="brand-text w-3/12">
          <Link to="/">
            <span className="text-orange-500">R</span>
            <span>EPORT</span>
          </Link>
        </div>
        <div className="w-8/12 flex justify-between">
          <ul className="flex w-8/12 justify-between">
            <li className="nav-item ">
              <NavLink
                to="/"
                exact="true"
                className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'nav-item-active' : '')}
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/report-day"
                exact="true"
                className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'nav-item-active' : '')}
              >
                Báo cáo thông tin Ngày
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/media"
                exact="true"
                className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'nav-item-active' : '')}
              >
                Truyền thông
              </NavLink>
            </li>
          </ul>
          <div className="w-2/12 flex justify-end">
            <NavLink
              to="/auth"
              className="bg-orange-400 flex items-center text-white font-semibold px-4 py-1 rounded-2xl ml-4 hover:bg-orange-300"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
