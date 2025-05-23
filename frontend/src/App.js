import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import FormularioVenta from './components/FormularioVenta';
import ListaVentas from './components/ListaVentas';

function App() {
  const [modoOscuro, setModoOscuro] = useState(false);

  const toggleModo = () => setModoOscuro(!modoOscuro);

  const claseFondo = modoOscuro ? 'bg-dark text-light' : 'bg-light text-dark';
  const claseBoton = modoOscuro ? 'btn btn-outline-light' : 'btn btn-outline-dark';
  const claseCard = modoOscuro ? 'card bg-secondary text-light shadow p-4' : 'card shadow p-4';

  return (
    <Router>
      <div className={`min-vh-100 ${claseFondo}`}>
        <div className="container py-4">
          <div className="d-flex justify-content-center align-items-center mb-4">
            <h1 className="mb-0 text-primary">💼 Gestión de Ventas - Melash</h1>
          </div>

          <nav className="d-flex justify-content-center gap-3 mb-4">
            <Link to="/" className="btn btn-outline-primary">📝 Registrar Venta</Link>
            <Link to="/ventas" className="btn btn-outline-success">📋 Listado de Ventas</Link>
          <button className={claseBoton} onClick={toggleModo}>
              {modoOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
            </button>
          </nav>

          <div className={claseCard}>
            <Routes>
              <Route path="/" element={<FormularioVenta modoOscuro={modoOscuro} />} />
              <Route path="/ventas" element={<ListaVentas modoOscuro={modoOscuro} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
