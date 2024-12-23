import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';
import SearchComponent from './SearchComponent';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const loggedInUserInfo = useSelector((state) => state.auth.userData);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For hamburger menu
  const navigate = useNavigate();

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (loggedInUserInfo) {
      setAvatarUrl(loggedInUserInfo.data.avatar);
    }
  }, [loggedInUserInfo]);

  return (
    <div className="min-h-[4rem]">
      <nav className="z-10 backdrop-blur-sm bg-black/70 fixed text-white px-4 py-2 flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <Link to="/" className="flex items-center space-x-1  md:space-x-2">
            <img src="src/assets/Animation - 1730886429630.gif" className="h-10 w-10" alt="Logo" />
          </Link>
        </div>
        <ul className={`md:flex ${isLoggedIn ? "flex" : "hidden"}  space-x-4 mr-10`} onClick={() => location.reload()}>
          <li><NavLink to="/" className={({ isActive }) => (isActive ? 'text-blue-400 text-sm font-medium' : 'text-sm font-medium')}>Home</NavLink></li>
          <li><NavLink to="/blogs" className={({ isActive }) => (isActive ? 'text-blue-400 text-sm font-medium' : 'text-sm font-medium')}>Blogs</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'text-blue-400 text-sm font-medium' : 'text-sm font-medium')}>About</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-blue-400 text-sm font-medium' : 'text-sm font-medium')}>Contact</NavLink></li>
        </ul>

        {/* Hamburger Menu */}
        <div className='flex gap-2'>

          <button
            className="block md:hidden p-1 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>

          {!isLoggedIn && (<div className="flex md:hidden  space-x-3 scale-90">
            <Button onClick={() => navigate('/login')} bgColor="bg-black">Log In</Button>
            <Button onClick={() => navigate('/signup')} bgColor="bg-white" textColor="text-black">Sign Up</Button>
          </div>)
          }
        </div>


        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between w-full">
          <SearchComponent />
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={handleDropdown}
                  className="flex items-center text-sm font-medium gap-1"
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={avatarUrl}
                    alt="User"
                  />
                  {loggedInUserInfo?.data?.username}
                  <svg
                    className="w-2.5 h-2.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 1l4 4 4-4" />
                  </svg>
                </button>
                {showDropdown && (
                  <div className="absolute bg-gray-900 text-white right-0 mt-2  w-28 rounded shadow-lg">
                    <ul className="py-1">
                      <li><Link to={`/dashboard/${loggedInUserInfo.data._id}`} className="block px-2 hover:bg-black py-2">Dashboard</Link></li>
                      <li><Link to="/createPost" className="block px-2 hover:bg-black py-2">Create Blog</Link></li>
                    </ul>
                    <div className="py-0">
                      <LogoutBtn className="block px-4 py-2 w-full" bgColor='hover:bg-black' />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <Button onClick={() => navigate('/login')} bgColor="bg-black">Log In</Button>
                <Button onClick={() => navigate('/signup')} bgColor="bg-white" textColor="text-black">Sign Up</Button>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full right-0 w-52 bg-black/70 text-white p-3 flex flex-col space-y-3 md:hidden">
            {isLoggedIn ? (
              <div>
                <div className='bg-black/70 flex p-3 gap-2 items-center justify-center'>
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={avatarUrl}
                    alt="User"
                  />
                  {loggedInUserInfo?.data?.username}
                </div>
                <ul className="">
                  <li><Link to={`/dashboard/${loggedInUserInfo?.data?._id}`} className="block px-2 hover:bg-black py-2">Dashboard</Link></li>
                  <li><Link to="/createPost" className="block px-2 hover:bg-black py-2">Create Blog</Link></li>
                </ul>
                <div className="">
                  <LogoutBtn className="block px-4 py-2 w-full" bgColor='hover:bg-black' />
                </div>
              </div>
            ) :
              <ul className="grid" onClick={() => location.reload()}>
                <li><NavLink to="/" className={({ isActive }) => (isActive ? 'text-blue-400 text-sm font-medium' : 'text-sm font-medium')}>Home</NavLink></li>
                <li><NavLink to="/blogs" className={({ isActive }) => (isActive ? 'text-blue-400 text-sm font-medium' : 'text-sm font-medium')}>Blogs</NavLink></li>
                <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'text-blue-400 text-sm font-medium' : 'text-sm font-medium')}>About</NavLink></li>
                <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-blue-400 text-sm font-medium' : 'text-sm font-medium')}>Contact</NavLink></li>
              </ul>
            }
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
