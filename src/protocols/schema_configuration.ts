import { STATUS_CODE } from "./status_code";

export type schema_configuration = {
  path: string;
  method: string;
  schema_name: string;
  request_data: "body" | "params" | "headers" | "query";
  uniques?: {
    property: string;
    column_name: string;
    table: string;
    must_not_exist: boolean;
    must_not_exist_status_code: STATUS_CODE;
    error_details: boolean;
  }[];
};
