import React from 'react';
import Button from './Button';

const Container = ({
  children,
  title = '',
  btn = '',
  btnClick = () => {},
  className = '',
}) => {
  return (
    <div
      className={`${className} rounded-md shadow-md w-full p-4 mx-auto sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2`}
    >
      {/* Title and Button Section */}
      <div className='flex justify-between items-center flex-wrap'>
        <h2 className="text-xl font-bold text-gray-700 opacity-60 text-center sm:text-left w-full sm:w-auto">
          {title}
        </h2>
        {btn && (
          <Button
            onClick={btnClick}
            className="mt-2 sm:mt-0 sm:w-auto w-full sm:text-sm text-base"
          >
            {btn}
          </Button>
        )}
      </div>

      {/* Divider for spacing */}
      <div className="p-4 flex justify-between border-b-2 items-center mb-4"></div>

      {/* Items Container (Children) */}
      {children}
    </div>
  );
};

export default Container;
