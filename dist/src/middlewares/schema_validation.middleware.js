var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import connection from "../database/database.js";
import { schemas_configuration } from "../enums/schema_configuration.js";
import { STATUS_CODE } from "../protocols/status_code.js";
import { schemas } from "../schemas/schemas.js";
function schemaValidation(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var route, path_1, method_1, schema_config, data, FIRST_ERROR, _a, value, error, i, len, config, query, NOT_EXIST, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    route = request.route;
                    path_1 = route.path;
                    method_1 = request.method;
                    schema_config = schemas_configuration.find(function (schema) {
                        if (schema.path === path_1 && schema.method === method_1) {
                            return true;
                        }
                    });
                    data = response.locals[schema_config.request_data];
                    FIRST_ERROR = 0;
                    _a = schemas[schema_config.schema_name].validate(data), value = _a.value, error = _a.error;
                    if (error !== undefined) {
                        console.log("schema error");
                        response
                            .status(STATUS_CODE.UNPROCESSABLE_ENTITY)
                            .send(error.details[FIRST_ERROR].message);
                        return [2 /*return*/];
                    }
                    if (schema_config.uniques === undefined) {
                        response.locals.safeData = value;
                        next();
                        return [2 /*return*/];
                    }
                    i = 0, len = schema_config.uniques.length;
                    _b.label = 1;
                case 1:
                    if (!(i < len)) return [3 /*break*/, 4];
                    config = schema_config.uniques[i];
                    return [4 /*yield*/, connection.query("SELECT \"".concat(config.column_name, "\" FROM ").concat(config.table, " WHERE \"").concat(config.column_name, "\"=$1"), [value[config.property]])];
                case 2:
                    query = _b.sent();
                    NOT_EXIST = query.rowCount === 0 ? true : false;
                    if (config.must_not_exist) {
                        if (!NOT_EXIST) {
                            if (config.error_details) {
                                response
                                    .status(config.must_not_exist_status_code)
                                    .send("error at ".concat(config.property));
                                return [2 /*return*/];
                            }
                            response.sendStatus(config.must_not_exist_status_code);
                            return [2 /*return*/];
                        }
                    }
                    else {
                        if (NOT_EXIST) {
                            if (config.error_details) {
                                response
                                    .status(config.must_not_exist_status_code)
                                    .send("error at ".concat(config.property));
                                return [2 /*return*/];
                            }
                            response.sendStatus(config.must_not_exist_status_code);
                            return [2 /*return*/];
                        }
                    }
                    _b.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    response.locals.safeData = value;
                    next();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    console.log("schema validation error");
                    console.log(error_1);
                    response.sendStatus(STATUS_CODE.SERVER_ERROR);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export { schemaValidation };
