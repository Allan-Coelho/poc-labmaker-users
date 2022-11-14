import { STATUS_CODE } from "../protocols/status_code.js";

const schemas_configuration = Object.freeze([
  {
    path: "A rota que voce quer configurar",
    method: "verbo http da rota",
    schema_name:
      "nome da propriedade que acessa o schema que vc criou em schemas.js",
    request_data: "por onde virao os dados body | params | headers | query",
    uniques: [
      {
        property:
          "propriedade que vc quer que exista(ou nao). A propriedade da tabela e do corpo da requisicao devem ter o mesmo nome",
        column_name:
          "nome da coluna, no banco, que corresponde a essa propriedade",
        table: "tabela onde se encontra a propriedade",
        must_not_exist: true, //A propriedade nao deve existir: true. A propriedade deve existir: false.
        must_not_exist_status_code: STATUS_CODE.CONFLICT, //erro que deve ser retornado ao usuário caso, por exemplo, a propriedade já exista
        error_details: true, //caso true, retorna uma mensagem genérica. ex: 'error at "email"'
      },
    ],
  },
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
        error_details: false,
      },
      {
        property: "phone",
        table: "users",
        column_name: "phone",
        must_not_exist: true,
        must_not_exist_status_code: STATUS_CODE.CONFLICT,
        error_details: false,
      },
      {
        property: "personal_email",
        table: "users",
        column_name: "personal_email",
        must_not_exist: true,
        must_not_exist_status_code: STATUS_CODE.CONFLICT,
        error_details: false,
      },
      {
        property: "institutional_id",
        table: "users",
        column_name: "institutional_id",
        must_not_exist: true,
        must_not_exist_status_code: STATUS_CODE.CONFLICT,
        error_details: false,
      },
    ],
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
        error_details: false,
      },
      {
        property: "permission_id",
        column_name: "id",
        table: "permissions",
        must_not_exist: false,
        must_not_exist_status_code: STATUS_CODE.NOT_FOUND,
        error_details: false,
      },
    ],
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
        error_details: false,
      },
    ],
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
        error_details: false,
      },
    ],
  },
  {
    path: "/users",
    method: "GET",
    schema_name: "search_user",
    request_data: "query",
  },
]);

export { schemas_configuration };
