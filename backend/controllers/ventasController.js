const db = require('../db');

exports.obtenerVentas = (req, res) => {
  db.all("SELECT * FROM ventas", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.crearVenta = (req, res) => {
  const { producto, cantidad, precio } = req.body;
  db.run(
    `INSERT INTO ventas (producto, cantidad, precio) VALUES (?, ?, ?)`,
    [producto, cantidad, precio],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, producto, cantidad, precio });
    }
  );
};

exports.eliminarVenta = (req, res) => {
  db.run(`DELETE FROM ventas WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
};

exports.actualizarVenta = (req, res) => {
  const { producto, cantidad, precio } = req.body;
  db.run(
    `UPDATE ventas SET producto = ?, cantidad = ?, precio = ? WHERE id = ?`,
    [producto, cantidad, precio, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: req.params.id, producto, cantidad, precio });
    }
  );
};
