# Product Service

---

## Project Description

This project is a RESTful API for managing products, built using Node.js. The API will allow consumers to create, update, delete, and retrieve products.

## Technical assumptions

- **Language and Framework:** The API will be built using NestJS, with
- **Database:** MongoDB(cloud.mongodb) with Mongoose as an ODM (Object Data Modeling) library.
- **Authentication:** JWT (JSON Web Token) will be used for securing the API endpoints. Consumers of the API will need to provide a valid JWT for authentication.
- **Testing:** Unit with Jest and Supertest to ensure the API's reliability and correctness.
- **Documentation:** API documentation will be created using Swagger
- **Deployment:** The API will be containerized using Docker for easy deployment.

## Product assumptions

- **Product Attributes:** Each product will have the following attributes:
  - Id: Unique identifier for the product (automatically generated).
  - Name: A string representing the product name.
  - Description: A string providing a detailed description of the product.
  - Price: A number representing the price of the product in GBP (£).
- Authentication Requirements: Only authenticated users with a valid JWT will be able to create, update, or delete products. Retrieval of product information will be publicly accessible.
- **API Endpoints:**

  - POST /products: Create a new product.
  - GET /products: Retrieve a list of all products.
  - GET /products/name/:name: Retrieve all products based on a search query.
  - GET /products/:id: Retrieve a single product by its Id.
  - PUT /products/:id: Update an existing product by its Id.
  - DELETE /products/:id: Delete a product by its Id.

- **Error Handling:** The API will provide meaningful error messages and HTTP status codes for various error conditions, such as invalid input, unauthorized access, and resource not found.
- **Scalability:** The API will be designed to handle a moderate amount of traffic and can be scaled horizontally by deploying multiple instances
- **Pagination:** The API will support retriving paginated products

## Project directory structure

    ├── __suppport__/ # supporting docs for the application
    |    ├── task.pdf # task requirement
    |    └── postman_collection.json # postman api collection
    |
    ├── src/ # api application logic
    |    ├── authorization/ # authorization files
    |    |    ├── auhtorization.guard.ts # JWT Auth Guard
    |    |    └── auhtorization.module.ts # Module for authorization
    |    |
    |    ├── config/ # configuration files
    |    |    ├── configService.ts # Service for configuration management
    |    |    └── validation.ts # Environment variable validation
    |    |
    |    ├── product/ # product-related logic
    |    |    ├── dto/ # Data Transfer Objects
    |    |    |    └── create-product.dto.ts # DTO for product creation
    |    |    ├── entity/ # Entities and types
    |    |    |    └── product.ts # Product TypeScript type
    |    |    ├── product.controller.ts # Controller for product routes
    |    |    ├── product.service.ts # Service for product logic
    |    |    └── product.module.ts # Module for product
    |    |
    |    └── provide/ # Dependency providers
    |    |    ├── schema/ # Schema definitions
    |    |    |    └── product.schema.ts # Mongoose schema for product
    |    |    └── mongo.module.ts # Module for MongoDB connection
    |    └── utils/ # utility functions
    |    |    └── product.utils.ts #  product helper functions
    |    |
    |    └── validation/ # utility functions
    |         └── product.id-validation.ts # Custom product Id validation
    |
    ├── test/ # test files and suites
    ├── Dockerfile # Dockerfile for building the application
    ├── docker-compose.yml # compose to spin up our app containers
    ├── package.json # dependencies list and scripts
    ├── tsconfig.json # typescript configurations
    ├── jest.config.ts # jest/test configurations
    ├── .dev.env # development environment variables
    ├── .env # production environment variables
    └── README.md # Project documentation including setup instructions

## Languages Frameworks and Tools

<p>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>
  </a>
  <a href="https://nestjs.com/" target="_blank" rel="noreferrer">
    <img src="https://nestjs.com/img/logo_text.svg" alt="nestjs" width="80" height="40"/>
  </a>
  <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/>
  </a>
  <a href="https://jestjs.io" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/>
  </a>
   <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">
    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.AoFmhuVcQWFwCx4G2ZnuJQHaIq%26pid%3DApi&f=1&ipt=0ab77d652f849b6e4d8640ad64b9db5764a24a1a4515957f5b9344ceac24eae5&ipo=images" alt="mongo cloud db" width="40" height="40"/>
  </a>
</p>

## Requirements

Follow the instructions provided in the official documentation for your OS

- Nodejs and npm -> https://nodejs.org/en/download/ (Node.js version >= v18.17.0 is required for Next.js version 14)
- docker -> https://www.docker.com/get-started/
- docker-compose -> https://docs.docker.com/compose/install/

## How to run the application

You have multiple ways to run the application: using Docker Compose (recommended), manually, or using Docker containers.

#### Run it using Docker Compose (Recommended)

To run the application using Docker Compose, you need Docker and Docker Compose installed. Follow these steps:

Build run the application using Docker Compose

```bash
$ docker compose up --build -d
```

Note: to stop the applications just run:

```bash
$ docker compose down
```

#### Run it Manually

To run the application manually, you need Node and npm installed. Follow these steps:

from the root `project-folder`:

1.  install dependencies
    ```bash
    $ npm install
    ```
2.  run the application
    ```bash
    $ npm run start:dev
    ```

#### Run it using Docker

To run the application using Docker, you need Docker installed. Follow these steps:

1. Build the Docker image for the backend server:
   ```bash
   $ docker build -t product-service .
   ```
2. Run server as Docker container:

   ```bash
   $ docker run --name product-service -d -p 5000:5000 product-service

   ```

## Tests

API unit test were created using jest

#### Run Unit tests (Jest)

From the root `project-folder` run all the tests:

```bash
$ npm run test
```

**Note:**

On the **helper** folder you will find a postman collection which allows you to directly test the api endpoints

## API Documentation

swagger

http://localhost:5000/apispec

#### Port Conflict

If you encounter port conflicts, it might be due to other applications using the same ports. Before running the application, ensure that ports `5000` is available. If not, you can modify the port bindings in the Dockerfile and in the docker-compose.yml file.

## Improvements

1. rate limit:

- Implement rate limiting to control the number of requests a user can make, preventing API overhead.

2. Tests:
   - More unit tests to cover all critical functions and edge cases.
   - Integraction tests to ensure different components of the application work well together
   - E2E end-to-end tests to verify the entire application flow using tools like Cypress.
3. Naming in convension:
   - Review all function and variable names to ensure they are clear, meaningful, and descriptive enough, and they only perform what they are supposed to.
4. Code formating
   - Ensure consistent code formatting throughout the project.

## Libraries

- [express-jwt](https://www.npmjs.com/package/express-jwt)
  - Express middleware for validating JWTs

# Useful articles

- [How To Strongly Type process.env](https://www.totaltypescript.com/how-to-strongly-type-process-env)

## Author

#### `Adilson Mendes`
