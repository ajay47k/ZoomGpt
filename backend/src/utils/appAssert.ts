/*
Asserts a condition and throws an AppError if the condition is falsy.
*/
import assert from "node:assert";
import AppError from "./AppError";
import { HttpStatusCode } from "../constants/http";
import AppErrorCode from "../constants/appErrorCodes";

type AppAssert = (
  condition: unknown,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode: AppErrorCode
) => void;

const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode
) => {
  assert(condition, new AppError(httpStatusCode, message, appErrorCode));
};

export default appAssert;
