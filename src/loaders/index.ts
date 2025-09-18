import { Application } from "express";
import expressLoader from "./express";
import dbLoader from "./database";
// import eventsLoader from "./events";

export default async (app: Application): Promise<void> => {
  await dbLoader();

  expressLoader(app);

  // eventsLoader();
};
