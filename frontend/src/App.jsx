import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Productos from './components/Productos';
import Usuarios from './components/Usuarios';
import Principal from './components/Principal';


function App() {
  return (
    <div className="app-js">
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
