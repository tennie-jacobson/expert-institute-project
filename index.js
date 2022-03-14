import express from 'express'
import cocktailRoutes from './api-routes/cocktailRoute.js'
import cors from 'cors'
import morgan from 'morgan'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { rateLimit } from 'express-rate-limit'
import xss from 'xss-clean'
import { JSONFileSync, LowSync } from 'lowdb'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/cocktail', cocktailRoutes);
/* Remember requests for 8 minutes, and a max of 6 connections */
app.use(
  rateLimit({
    windowMs: 8 * 60 * 1000,
    max: 6,
  })
);
app.use(xss());

// set up simulation database for project purposes
const file = join(__dirname, 'mockData/db.json');
const adapter = new JSONFileSync(file);
const db = new LowSync(adapter);

/* Set up swagger options */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API"
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ]
  },
  apis: ['./api-routes/*.js']
};
const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

await db.read();
// If JSON file DNE then assign default data
db.data ||= {drinks: [], ingredients: [], categories: [], alcoholic: [], glasses: []}

app.db = db;

app.get('/', (req, res) => {
    res.send(`<h1>Home Page</h1><p>Please find your way to http://localhost:${PORT}/api-docs </p>`)});

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))
