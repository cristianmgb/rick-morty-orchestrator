import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Welcome } from '@/presentation/pages/welcome/Welcome';
import { Home } from '@/presentation/pages/home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Welcome />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="*"
          element={<Welcome />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
