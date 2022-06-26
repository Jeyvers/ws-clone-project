import logo from './logo.svg';
import './css/index.css';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router';
import Chat from './components/Chat';
import { useGlobalContext } from './StateProvider';
import Landing from './pages/Landing';

function App() {
  const { user } = useGlobalContext();
  return (
    <>
      {!user ? (
        <Landing />
      ) : (
        <div className='home'>
          <Sidebar />
          <Routes>
            <Route path='/groups/:groupId' element={<Chat />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
