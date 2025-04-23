import React from 'react';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[#f4b049]'>
      <img src="/404Image.png" alt="404 Not Found" height={200} width={200}/>
      <span className='text-3xl font-bold'>404 :(</span>
      <p className='font-semibold'>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}