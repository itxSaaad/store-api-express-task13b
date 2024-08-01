import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import {
  errorHandler,
  notFoundHandler,
} from './middlewares/errorMiddleware.js';

import connectDb from './config/dbConnect.js';

import productRoutes from './routes/productRoutes.js';

// Load env vars
dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to database
connectDb();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json());

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes

app.get('/', (req, res) => {
  res.send(`
        <section>
            <h1>Store API</h1>
            <a href='/api/v1/products'>Products</a>
        </section>
        `);
});

app.use('/api/v1/products', productRoutes);

// Custom Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
