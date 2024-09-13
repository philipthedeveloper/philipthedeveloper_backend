import { createNotFoundError } from "../errors/index.js";

export const routeNotFound = (req, res) => {
  throw createNotFoundError(`${req.url} does not exist`);
};

export default routeNotFound;
