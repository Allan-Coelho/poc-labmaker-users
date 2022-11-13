import { stripHtml } from "string-strip-html";
import { STATUS_CODE } from "../protocols/status_code.js";
import { Response, Request, NextFunction } from "express";

const propertiesToSanitize = [
  "name",
  "personal_email",
  "institutional_email",
  "phone",
  "cep",
  "address_number",
  "address_additional_information",
  "institutional_id",
];

function html_sanitizer(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestObjectsToSanitize = ["headers", "body", "query", "params"];

  try {
    for (let j = 0, len0 = requestObjectsToSanitize.length; j < len0; j++) {
      const objectKey = requestObjectsToSanitize[j];
      const object = request?.[objectKey];

      if (!object) {
        continue;
      }

      for (let i = 0, len1 = propertiesToSanitize.length; i < len1; i++) {
        const propertyName = propertiesToSanitize[i];
        const propertyValue = String(object?.[propertyName]);

        if (propertyValue === "undefined" || propertyValue === undefined) {
          continue;
        }

        response.locals[objectKey] = { ...response.locals[objectKey] };
        response.locals[objectKey][propertyName] =
          stripHtml(propertyValue).result;
      }
    }

    next();
  } catch (error) {
    console.log("html sanitizer error");
    console.log(error);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { html_sanitizer };
