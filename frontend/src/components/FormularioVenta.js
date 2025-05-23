import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FormularioVenta() {
  const [venta, setVenta] = useState({ producto: '', cantidad: '', precio: '' });
  const [notificacion, setNotificacion] = useState(null);  // nuevo estado para notificación


  const mostrarNotificacion = (tipo, mensaje) => {
    setNotificacion({ tipo, mensaje });
    setTimeout(() => setNotificacion(null), 3000);
  };

  const handleChange = e => {
    setVenta({ ...venta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/ventas', venta);
      setVenta({ producto: '', cantidad: '', precio: '' });
      mostrarNotificacion('success', 'Venta registrada correctamente');
    } catch (error) {
      mostrarNotificacion('danger', 'Error al registrar la venta');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-4">📝 Registrar Nueva Venta</h4>

      {notificacion && (
        <div
          className={`alert alert-${notificacion.tipo} alert-dismissible fade show`}
          role="alert"
        >
          {notificacion.mensaje}
          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar"
            onClick={() => setNotificacion(null)}
          ></button>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Producto</label>
        <input
          type="text"
          className="form-control"
          name="producto"
          value={venta.producto}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Cantidad</label>
        <input
          type="number"
          className="form-control"
          name="cantidad"
          value={venta.cantidad}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          name="precio"
          value={venta.precio}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">💾 Guardar Venta</button>
    </form>
  );
}
