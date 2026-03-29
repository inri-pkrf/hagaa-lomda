import React from 'react';
import { Outlet } from 'react-router-dom';
import UnitOneSidebar from './UnitOneSidebar';

const UnitOneLayout = () => {
  return (
    <div className="unit-one-wrapper">
      {/* הסידבר מופיע כאן פעם אחת לכל הפרקים */}
      <UnitOneSidebar />
      
      {/* ה-Outlet הוא ה"מקום הפנוי" שבו ירונדרו הדפים (Threats, States וכו') */}
      <div className="unit-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UnitOneLayout;