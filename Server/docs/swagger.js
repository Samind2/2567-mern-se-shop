const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
 info: {
  version: '1.0.0',            // by default: '1.0.0'
  title: 'SE SHOP REST API',              // by default: 'REST API'
  description: 'RESTsul API fro SE SHOP',         // by default: ''
  contact: {
   name: "Supanee Rungsirat",
   email: "654259012@webmail.npru.ac.th"
  }
 },
 servers: [
  {
   url: "http://localhost:5000", // by default: 'http://localhost:3000',              // by default: 'http://localhost:3000'
   description: "Local", // by default: ''
  },
  // { ... }
 ],
 tags: [                   // by default: empty Array
  {
   name: 'Product',             // Tag name
   description: "API For Product Object", //Tag description
  },
  {
   name: 'Cart',             // Tag name
   description: "API For Product Object", //Tag description
  },
  // { ... }
 ],
 components: {
  schemas: {
   Product: {
    type: 'object',
    properties: {
     name: { type: "string" },
     category: { type: "string" },
     description: { type: "string" },
     image: { type: "string" },
     price: { type: "Number" },
    }
   },
   NewProduct: {
    name: "Keyboard",
    description: "MOFii Cotton Candy Bluetooth Keyboard คีย์บอร์ดไร้สาย - Mix Pink",
    category: "gadget",
    price: "2000"
   }
  }
 }            // by default: empty object
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);