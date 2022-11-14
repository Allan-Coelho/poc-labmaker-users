import connection from "../database/database.js";
import { schemas_configuration } from "../enums/schema_configuration.js";
import { STATUS_CODE } from "../protocols/status_code.js";
import { schemas } from "../schemas/schemas.js";
import { Response, Request, NextFunction } from "express";

async function schemaValidation(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const route = request.route;
    const path: string = route.path;
    const method: string = request.method;
    const schema_config = schemas_configuration.find((schema) => {
      if (schema.path === path && schema.method === method) {
        return true;
      }
    });
    const data = response.locals[schema_config.request_data];
    const FIRST_ERROR = 0;
    const { value, error } = schemas[schema_config.schema_name].validate(data);

    if (error !== undefined) {
      console.log("schema error");
      response
        .status(STATUS_CODE.UNPROCESSABLE_ENTITY)
        .send(error.details[FIRST_ERROR].message);
      return;
    }

    if (schema_config.uniques === undefined) {
      response.locals.safeData = value;
      next();
      return;
    }

    for (let i = 0, len = schema_config.uniques.length; i < len; i++) {
      const config = schema_config.uniques[i];
      const query = await connection.query(
        `SELECT "${config.column_name}" FROM ${config.table} WHERE "${config.column_name}"=$1`,
        [value[config.property]]
      );
      const NOT_EXIST = query.rowCount === 0 ? true : false;

      if (config.must_not_exist) {
        if (!NOT_EXIST) {
          if (config.error_details) {
            response
              .status(config.must_not_exist_status_code)
              .send(`error at ${config.property}`);
            return;
          }

          response.sendStatus(config.must_not_exist_status_code);
          return;
        }
      } else {
        if (NOT_EXIST) {
          if (config.error_details) {
            response
              .status(config.must_not_exist_status_code)
              .send(`error at ${config.property}`);
            return;
          }

          response.sendStatus(config.must_not_exist_status_code);
          return;
        }
      }
    }

    response.locals.safeData = value;
    next();
  } catch (error) {
    console.log("schema validation error");
    console.log(error);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { schemaValidation };
