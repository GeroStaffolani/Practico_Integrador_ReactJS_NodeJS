import { Routes, Route } from 'react-router-dom';
import Productos from './components/Productos';
import Usuarios from './components/Usuarios';
import Principal from './components/Principal';

function App() {
  return (
    <div className="container mt-5 text-center">
      <h1>Gestor Fullstack</h1>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </div>
  );
}

export default App;
