import React, { useState, useContext } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import { Store } from '../Store';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  // const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/productpage', label: 'Products' },
    { href: '/aboutus', label: 'About Us' },
    { href: '/contact-us', label: 'Contact Us' },
    { href: '/cart', label: 'Cart' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <header className="bg-gray-600 fixed top-0 w-full z-50 ">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <NavLink to="/" className="text-3xl font-bold text-white">
            Logo
          </NavLink>
          <div className="flex items-center">
            <div className="hidden lg:flex space-x-8">
              {navLinks.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  {item.label}
                  {item.label === 'Cart' && cart.cartItems.length > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 rounded-full ml-1">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
            <div className="lg:hidden">
              {isMenuOpen ? (
                <AiOutlineClose
                  className="text-white text-2xl cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                />
              ) : (
                <RxHamburgerMenu
                  className="text-white text-2xl cursor-pointer"
                  onClick={() => setIsMenuOpen(true)}
                />
              )}
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden bg-gray-800 py-2">
              {navLinks.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className="block text-white px-4 py-2 hover:bg-gray-700 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  {item.label === 'Cart' && cart.cartItems.length > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 rounded-full ml-1">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </NavLink>
              ))}
              {userInfo ? (
                <div className="block text-white px-4 py-2 hover:bg-gray-700 transition duration-300 relative">
                  <button
                    type="button"
                    className="font-montserrat leading-normal text-lg text-slate-gray focus:outline-none"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {userInfo.name}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5 inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <div className="py-1" role="none">
                        <NavLink
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          User Profile
                        </NavLink>
                        <NavLink
                          to="/orderhistory"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Order History
                        </NavLink>
                        <NavLink
                          to="#signout"
                          onClick={signoutHandler}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          // onClick={setIsDropdownOpen(false)}
                        >
                          Sign Out
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/signin"
                  className="block text-white px-4 py-2 hover:bg-gray-700 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </NavLink>
              )}
            </div>
          )}

          {/* Sign in and user profile for normal screen size */}
          {!isMenuOpen && (
            <div className="hidden lg:flex space-x-4 items-center">
              {userInfo ? (
                <div className="relative">
                  <button
                    type="button"
                    className="text-white hover:text-gray-300 transition duration-300"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {userInfo.name}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5 inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <div className="py-1" role="none">
                        <NavLink
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          User Profile
                        </NavLink>
                        <NavLink
                          to="/orderhistory"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Order History
                        </NavLink>
                        <NavLink
                          to="#signout"
                          onClick={signoutHandler}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Sign Out
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/signin"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Sign In
                </NavLink>
              )}
            </div>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="relative inline-block text-left">
              <button
                onClick={toggleDropdown}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                id="admin-nav-dropdown"
                aria-haspopup="true"
                aria-expanded={isOpen}
              >
                Admin
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="admin-nav-dropdown"
                  >
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/products"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Products
                    </Link>
                    <Link
                      to="/admin/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/admin/users"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Users
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
