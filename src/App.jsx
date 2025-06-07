import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import { useCartAutoSync } from '../src/hooks/useCartAutoSync'; // Custom hook for cart auto-sync

const App = () => {
  // useCartAutoSync()
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