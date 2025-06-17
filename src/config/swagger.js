import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AdoptMe API",
      version: "1.0.0",
      description: "Proyecto final - Backend III - Coderhouse",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Local development server",
      },
    ],
    tags: [
      { name: "Users", description: "User operations" },
      { name: "Pets", description: "Pet management" },
      { name: "Mocks", description: "Mock generation of users and pets" },
      { name: "Adoptions", description: "Pet adoption operations" },
      { name: "Sessions", description: "Authentication and sessions" },
    ],
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
export { swaggerUi };
