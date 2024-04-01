import React, { useState, useContext } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Store } from '../Store';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about-us', label: 'About Us' },
    { href: '/contact-us', label: 'Contact Us' },
    { href: '/cart', label: 'Cart' },
  ];

  return (
    <>
      <header className="sm:px-8 px-4 py-2 z-10 w-full bg-gray-600">
        <nav className="flex justify-between items-center max-container">
          <Link to="/" className="text-3xl font-bold">
            Logo
          </Link>
          <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="font-montserrat leading-normal text-lg text-slate-gray  button-33 relative"
                >
                  {item.label}
                  {item.label === 'Cart' && cart.cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 inline-block bg-red-500 text-white text-xs px-2 rounded-full">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </Link>
              </li>
            ))}
            {userInfo ? (
              <li className="relative inline-block text-left">
                <div>
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
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {isDropdownOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className="py-1" role="none">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        User Profile
                      </Link>
                      <Link
                        to="/orderhistory"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Order History
                      </Link>
                      <Link
                        to="#signout"
                        onClick={signoutHandler}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Sign Out
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <Link
                  className="font-montserrat leading-normal text-lg text-slate-gray"
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
          <div
            className="hidden max-lg:block cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <RxHamburgerMenu className="text-4xl" />
          </div>
        </nav>
      </header>
      {isMenuOpen && (
        <div>
          <nav className="fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-600  ">
            <div
              className="hidden max-lg:block fixed right-0  px-8 py-4 cursor-pointer"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <AiOutlineClose className="text-4xl" />
            </div>
            <ul className=" lg:hidden flex flex-col items-center justify-center h-full ">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="font-montserrat leading-normal text-lg text-slate-gray button-33"
                  >
                    {item.label}
                    {item.label === 'Cart' && cart.cartItems.length > 0 && (
                      <span className="absolute top-0 right-0 inline-block bg-red-500 text-white text-xs px-2 rounded-full">
                        {cart.cartItems.length}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              {userInfo ? (
                <li className="relative inline-block text-left">
                  <div>
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
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <div className="py-1" role="none">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          User Profile
                        </Link>
                        <Link
                          to="/orderhistory"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Order History
                        </Link>
                        <Link
                          to="#signout"
                          onClick={signoutHandler}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Sign Out
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              ) : (
                <li>
                  <Link
                    className="font-montserrat leading-normal text-lg text-slate-gray"
                    to="#signin"
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
