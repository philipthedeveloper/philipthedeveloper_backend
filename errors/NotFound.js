import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";

export class NotFoundError extends CustomError {
  statusCode;

  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export const createNotFoundError = (message) => new NotFoundError(message);
