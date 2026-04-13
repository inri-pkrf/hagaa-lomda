import React from 'react';
import { Outlet } from 'react-router-dom';
import UnitTwoSidebar from './UnitTwoSidebar';

const UnitTwoLayout = () => {
  return (
    <div className="unit-two-wrapper">
      <UnitTwoSidebar />
      <div className="unit-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UnitTwoLayout;