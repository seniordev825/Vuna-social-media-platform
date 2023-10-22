import React from 'react';

const FloatingMessage: React.FC = () => {
  return (
    <>
      <div
        style={{
          position: 'fixed', // Use 'fixed' to keep it in view even while scrolling
          bottom: '10px', // Distance from the bottom of the viewport
          left: '50%', // Center the div horizontally
          transform: 'translateX(-50%)', // Center the div horizontally
          height: '50px',
          width: '80%',
          fontSize: '20px',
          background: 'rgba(255, 166, 0, 0.8)', // Change the background color to orange
          color: '#fff',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 9999,
        }}
      >
        <a href="https://www.highcpmrevenuegate.com/yadniuwkh?key=2afbd09ba20bdb36306c37c52f5a3244" style={{ color: 'red' }}>VUNA leak tapes</a>
      </div>
    </>
  );
};

export default FloatingMessage;
