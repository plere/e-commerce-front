import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StoreRegisterPage from './pages/StoreRegisterPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store/*" element={<StoreRegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
