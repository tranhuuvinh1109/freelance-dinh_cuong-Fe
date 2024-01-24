import { Link, NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import './Header.css';
import { useState } from 'react';
import navBar from '../../constant/navBar.json';

const Header = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const handleOpen = () => {
    setOpenMobile(!openMobile);
  };
  return (
    <nav
      className={`${openMobile ? 'bg-overlay' : 'bg-white'} z-50  md:bg-white fixed top-0 left-0 right-0 md:border-b`}
    >
      {openMobile ? (
        <div className="bg-white w-4/5 h-screen">
          <div className="p-4 flex justify-end">
            <button className="p-2 rounded-md border hover:bg-slate-400" onClick={handleOpen}>
              <FaTimes fontSize={18} />
            </button>
          </div>
          <div>
            <ul>
              {navBar.map((item, index) => {
                return (
                  <li className="nav-item border px-3 py-2 mb-1" key={index} onClick={handleOpen}>
                    <NavLink
                      to={item.url}
                      exact="true"
                      className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'nav-item-active' : ''
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="p-4 md:hidden">
          <button className="p-2 rounded-md border hover:bg-slate-400" onClick={handleOpen}>
            <FaBars fontSize={18} />
          </button>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto justify-between items-center py-4 hidden md:flex">
        <div className="brand-text w-2/12">
          <Link to="/">
            <img src="https://i.ibb.co/6mVjmhB/vnpt-logo-header.jpg" className='h-[60px] md:h-[60px]' alt="VNPT" />
          </Link>
        </div>
        <div className="w-9/12 flex justify-between">
          <ul className="flex justify-between gap-12">
            {navBar.map((item, index) => {
              return (
                <li className="nav-item " key={index}>
                  <NavLink
                    to={item.url}
                    exact="true"
                    className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'nav-item-active' : '')}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
