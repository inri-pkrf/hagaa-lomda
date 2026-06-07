import React from 'react';
import { Outlet } from 'react-router-dom';
import UnitThreeSidebar from './UnitThreeSidebar';

const UnitThreeLayout = () => {
  return (
    <div className="unit-three-wrapper">
      <UnitThreeSidebar />
      <div className="unit-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UnitThreeLayout;