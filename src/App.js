import logo from './logo.svg';
import './css/index.css';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router';
import Chat from './components/Chat';

function App() {
  return (
    <div className='home'>
      <Sidebar />
      <Routes>
        <Route path='/groups/:groupId' element={<Chat />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
