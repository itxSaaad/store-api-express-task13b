import { Router } from 'express';

const router = Router();

router
  .route('/')
  .get((req, res) => {
    res.send(`
        <section>
            <h1>All Products</h1>
            <a href='/api/v1/products/1'>Product 1</a>
            <a href='/api/v1/products/2'>Product 2</a>
        </section>
        `);
  })
  .post((req, res) => {
    res.send('Create new product');
  });

router
  .route('/:id')
  .get((req, res) => {
    res.send(`Product ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update product ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete product ${req.params.id}`);
  });

export default router;
