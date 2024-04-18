import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

function AboutUs() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') setEmailCopied(true);
    if (type === 'phone') setPhoneCopied(true);
    if (type === 'address') setAddressCopied(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="mt-8 max-w-xl text-center bg-white p-8 rounded shadow-lg py-4 m-4">
        <h1 className="text-3xl font-bold mb-2">About Us</h1>
        <div className="flex items-center justify-between ml-4">
          <p className="text-lg mb-2">
            Email:<span> example@email.com</span>
          </p>
          {emailCopied ? (
            <span style={{ color: 'green' }}>Copied!</span>
          ) : (
            <button
              onClick={() => copyToClipboard('example@email.com', 'email')}
              className="flex items-center"
            >
              <div className="mr-3 h-8 w-8">
                <FaCopy className="h-full w-full" />
              </div>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg mb-2">Phone: +1 (123) 456-7890</p>
          {phoneCopied ? (
            <span style={{ color: 'green' }}>Copied!</span>
          ) : (
            <button
              onClick={() => copyToClipboard('+1 (123) 456-7890', 'phone')}
              className="flex items-center"
            >
              <div className="mr-3 h-8 w-8">
                <FaCopy className="h-full w-full" />
              </div>
            </button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg mb-2">
            Address: 1234 Main Street, City, State, ZIP Code
          </p>
          {addressCopied ? (
            <span style={{ color: 'green' }}>Copied!</span>
          ) : (
            <button
              onClick={() =>
                copyToClipboard(
                  '1234 Main Street, City, State, ZIP Code',
                  'address'
                )
              }
              className="flex items-center"
            >
              <div className="mr-3 h-8 w-8">
                <FaCopy className="h-full w-full" />
              </div>
            </button>
          )}
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.0348862292385!2d91.27690887518503!3d23.674710378722143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37538b3d9dba209b%3A0xb59abb24a64a4d84!2sSTUDIO%20NUPUR!5e0!3m2!1sen!2sin!4v1712178954065!5m2!1sen!2sin"
        width="100%"
        height="500"
        style={{ border: '0' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>
  );
}

export default AboutUs;
