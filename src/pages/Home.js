import React from 'react';
import Chat from '../components/Chat';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <main className='home'>
      <Navbar />
      <Sidebar />
      <Chat />
    </main>
  );
};

export default Home;
