import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ producto: '', cantidad: '', precio: '' });
  const [notificacion, setNotificacion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ventaAEliminar, setVentaAEliminar] = useState(null);

  useEffect(() => {
    obtenerVentas();
  }, []);

  const mostrarNotificacion = (tipo, mensaje) => {
    setNotificacion({ tipo, mensaje });
    setTimeout(() => setNotificacion(null), 4000);
  };

  const obtenerVentas = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/ventas');
      setVentas(res.data);
    } catch (error) {
      mostrarNotificacion('danger', 'Error al cargar ventas');
    }
  };

  // Al dar click en eliminar, abrimos modal y guardamos venta a eliminar
  const confirmarEliminar = (venta) => {
    setVentaAEliminar(venta);
    setShowModal(true);
  };

  // Al confirmar en modal, se ejecuta la eliminación
  const eliminarVenta = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/ventas/${ventaAEliminar.id}`);
      mostrarNotificacion('success', 'Venta eliminada');
      obtenerVentas();
    } catch (error) {
      mostrarNotificacion('danger', 'Error al eliminar venta');
    } finally {
      setShowModal(false);
      setVentaAEliminar(null);
    }
  };

  const iniciarEdicion = (venta) => {
    setEditando(venta.id);
    setForm(venta);
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setForm({ producto: '', cantidad: '', precio: '' });
  };

  const guardarCambios = async () => {
    try {
      await axios.put(`http://localhost:4000/api/ventas/${editando}`, form);
      mostrarNotificacion('success', 'Cambios guardados');
      cancelarEdicion();
      obtenerVentas();
    } catch (error) {
      mostrarNotificacion('danger', 'Error al guardar cambios');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h4 className="mb-4">📋 Listado de Ventas</h4>

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
          />
        </div>
      )}

      {ventas.length === 0 ? (
        <p className="text-muted">No hay ventas registradas.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((v) => (
              <tr key={v.id}>
                <td>
                  {editando === v.id ? (
                    <input
                      name="producto"
                      value={form.producto}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    v.producto
                  )}
                </td>
                <td>
                  {editando === v.id ? (
                    <input
                      name="cantidad"
                      value={form.cantidad}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    v.cantidad
                  )}
                </td>
                <td>
                  {editando === v.id ? (
                    <input
                      name="precio"
                      value={form.precio}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    `$${v.precio}`
                  )}
                </td>
                <td>${(v.precio * v.cantidad).toFixed(2)}</td>
                <td>
                  {editando === v.id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={guardarCambios}
                      >
                        💾 Guardar
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={cancelarEdicion}
                      >
                        ❌ Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => iniciarEdicion(v)}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => confirmarEliminar(v)}
                      >
                        🗑 Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal React para confirmar eliminación */}
      {showModal && (
        <>
          {/* Fondo */}
          <div
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1040,
            }}
          />
          {/* Contenido modal */}
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.3rem',
              boxShadow: '0 3px 9px rgba(0,0,0,0.5)',
              zIndex: 1050,
              minWidth: '300px',
              maxWidth: '90vw',
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title">Confirmar eliminación</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Cerrar"
                onClick={() => setShowModal(false)}
              />
            </div>
            <div className="modal-body">
              <p>
                ¿Estás seguro que deseas eliminar la venta del producto{' '}
                <strong>{ventaAEliminar?.producto}</strong>?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={eliminarVenta}
              >
                Eliminar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
