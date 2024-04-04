import React from 'react';

function AboutUs() {
  return (
    <div className="flex justify-center items-center h-screen">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.0348862292385!2d91.27690887518503!3d23.674710378722143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37538b3d9dba209b%3A0xb59abb24a64a4d84!2sSTUDIO%20NUPUR!5e0!3m2!1sen!2sin!4v1712178954065!5m2!1sen!2sin"
        width="800"
        height="600"
        style={{ border: '0' }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default AboutUs;
