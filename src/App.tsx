import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Welcome } from '@/presentation/pages/welcome/Welcome';
import { Home } from '@/presentation/pages/home/Home';
import { Locations } from '@/presentation/pages/locations/Locations';

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
          path="/locations"
          element={<Locations />}
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
