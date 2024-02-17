import Link from 'next/link';
import React from 'react';

const Unauthorized = () => {
  return (
    <div className="p-4 text-center h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl md:text-5xl">Unauthorized access!</h1>
      <p>Please contact support your agency owner to get access</p>
      <Link href="/" className="mt-5 bg-primary rounded-sm text-white p-2">
        Back to home
      </Link>
    </div>
  );
};

export default Unauthorized;
