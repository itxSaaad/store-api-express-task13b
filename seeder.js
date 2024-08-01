import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import connectDb from './config/dbConnect.js';

import Product from './models/productModel.js';

dotenv.config();

connectDb();

const __dirname = path.resolve();

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log('Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
