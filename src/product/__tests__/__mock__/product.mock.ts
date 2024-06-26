import { Types } from 'mongoose';

export const mockProducts = [
  {
    _id: new Types.ObjectId('60c72b2f9b1e8a5f88d8e1b6'),
    name: 'Product 1',
    description: 'Description for product 1',
    price: 100,
  },
  {
    _id: new Types.ObjectId('60c72b2f9b1e8a5f88d8e1b7'),
    name: 'Product 2',
    description: 'Description for product 2',
    price: 200,
  },
];
