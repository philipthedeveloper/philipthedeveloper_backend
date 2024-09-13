import {
  createBadRequestError,
  createMethodNotAllowedError,
  createNotFoundError,
  createUnprocessableEntityError,
} from "../errors/index.js";
import CustomError from "../errors/CustomError.js";
import { ReasonPhrases } from "http-status-codes";

export const throwBadRequestError = (message) => {
  throw createBadRequestError(message);
};

export const throwMethodNotAllowedError = (message) => {
  throw createMethodNotAllowedError(message);
};

export const throwNotFoundError = (message) => {
  throw createNotFoundError(message);
};

export const throwUnprocessableEntityError = (message) => {
  throw createUnprocessableEntityError(message);
};

export const throwServerError = (message) => {
  throw new CustomError(message || ReasonPhrases.INTERNAL_SERVER_ERROR);
};
