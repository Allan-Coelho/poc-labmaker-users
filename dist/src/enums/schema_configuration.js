import { STATUS_CODE } from "../protocols/status_code.js";
var schemas_configuration = [
    {
        path: "/users/sign-up",
        method: "POST",
        schema_name: "sign_up_schema",
        request_data: "body",
        uniques: [
            {
                property: "institutional_email",
                table: "users",
                column_name: "institutional_email",
                must_not_exist: true,
                must_not_exist_status_code: STATUS_CODE.CONFLICT,
                error_details: false
            },
            {
                property: "phone",
                table: "users",
                column_name: "phone",
                must_not_exist: true,
                must_not_exist_status_code: STATUS_CODE.CONFLICT,
                error_details: false
            },
            {
                property: "personal_email",
                table: "users",
                column_name: "personal_email",
                must_not_exist: true,
                must_not_exist_status_code: STATUS_CODE.CONFLICT,
                error_details: false
            },
            {
                property: "institutional_id",
                table: "users",
                column_name: "institutional_id",
                must_not_exist: true,
                must_not_exist_status_code: STATUS_CODE.CONFLICT,
                error_details: false
            },
        ]
    },
    {
        path: "/users/permissions",
        method: "PUT",
        schema_name: "update_user_permission_schema",
        request_data: "body",
        uniques: [
            {
                property: "user_id",
                column_name: "id",
                table: "users",
                must_not_exist: false,
                must_not_exist_status_code: STATUS_CODE.NOT_FOUND,
                error_details: false
            },
            {
                property: "permission_id",
                column_name: "id",
                table: "permissions",
                must_not_exist: false,
                must_not_exist_status_code: STATUS_CODE.NOT_FOUND,
                error_details: false
            },
        ]
    },
    {
        path: "/users/:id",
        method: "DELETE",
        schema_name: "id_schema",
        request_data: "params",
        uniques: [
            {
                property: "id",
                column_name: "id",
                table: "users",
                must_not_exist: false,
                must_not_exist_status_code: STATUS_CODE.NOT_FOUND,
                error_details: false
            },
        ]
    },
    {
        path: "/users/:id",
        method: "GET",
        schema_name: "id_schema",
        request_data: "params",
        uniques: [
            {
                property: "id",
                column_name: "id",
                table: "users",
                must_not_exist: false,
                must_not_exist_status_code: STATUS_CODE.NOT_FOUND,
                error_details: false
            },
        ]
    },
    {
        path: "/users",
        method: "GET",
        schema_name: "search_user",
        request_data: "query"
    },
];
export { schemas_configuration };
