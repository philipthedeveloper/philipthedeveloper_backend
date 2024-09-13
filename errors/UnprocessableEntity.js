import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";

export class UnprocessableEntityError extends CustomError {
  statusCode;

  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}

export const createUnprocessableEntityError = (message) =>
  new UnprocessableEntityError(message);
