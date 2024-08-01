import dotenv from 'dotenv';

import connectDb from './config/dbConnect';

import Product from './models/Product';

import products from './products.json';

// Load env vars
dotenv.config();

// Connect to database
connectDb();

const importData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
