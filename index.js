import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import {
  errorHandler,
  notFoundHandler,
} from './middlewares/errorMiddleware.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

// Middlewares
app.use(express.json());

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});

app.get('/api/v1/products', (req, res) => {
  res.send('<h2>Products</h2>');
});

// Custom Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
