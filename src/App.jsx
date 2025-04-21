import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;