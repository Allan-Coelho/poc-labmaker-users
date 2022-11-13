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
        table: "tabela onde se encontra a propriedade",
        must_not_exist: true, //A propriedade nao deve existir: true. A propriedade deve existir: false.
        must_not_exist_status_code: STATUS_CODE.CONFLICT, //erro que deve ser retornado ao usuário caso, por exemplo, a propriedade já existir
        error_details: true, //caso true, retorna uma mensagem genérica 'error at "email"'
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
        must_not_exist: true,
        must_not_exist_status_code: STATUS_CODE.CONFLICT,
        error_details: true,
      },
    ],
  },
]);

export { schemas_configuration };
