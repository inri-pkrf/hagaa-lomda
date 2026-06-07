import React from 'react';
import { Outlet } from 'react-router-dom';
import UnitFourSidebar from './UnitFourSidebar';

const UnitFourLayout = () => {
  return (
    <div className="unit-four-wrapper">
      <UnitFourSidebar />
      <div className="unit-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UnitFourLayout;