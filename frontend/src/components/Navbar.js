import React, { useState, useContext } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Store } from '../Store';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useContext(Store);
  const { cart } = state;

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
          </ul>
          <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
            <Link to="/signin">Sign in</Link>
            <span>/</span>
            <Link to="/">Explore now</Link>
          </div>
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
                    className="font-montserrat leading-normal text-lg text-slate-gray button-33 relative"
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
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
