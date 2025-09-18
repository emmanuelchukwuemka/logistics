import express, { Application } from "express";
import loaders from "./loaders";

const app: Application = express();

(async () => {
  await loaders(app);
})();

export default app;
