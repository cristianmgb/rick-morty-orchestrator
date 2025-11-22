import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Welcome } from './presentation/pages/welcome/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Welcome />}
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
