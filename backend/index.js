const express = require('express');
const cors = require('cors');
const ventasRoutes = require('./routes/ventas');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/ventas', ventasRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(4000, () => {
  console.log('Servidor corriendo en http://localhost:4000');
});