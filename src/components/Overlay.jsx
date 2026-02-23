import React from 'react';

function Overlay({ children }) {
  return (
    <div>
      <h2>Overlay</h2>
      <div>{children}</div>
    </div>
  );
}

export default Overlay;

