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
import { STATUS_CODE } from "../protocols/status_code.js";
import * as users_repository from "../repositories/Users.repository.js";
function sign_up(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var UNDERGRADUATE_STUDENT, STANDARD_PERMISSION, user_data, query, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    UNDERGRADUATE_STUDENT = 4;
                    STANDARD_PERMISSION = 1;
                    user_data = response.locals.safeData;
                    user_data.role_id = UNDERGRADUATE_STUDENT;
                    user_data.permission_id = STANDARD_PERMISSION;
                    console.log(response.locals);
                    return [4 /*yield*/, users_repository.insertUser(user_data)];
                case 1:
                    query = _a.sent();
                    if (query.rowCount === 0) {
                        response.sendStatus(STATUS_CODE.SERVER_ERROR);
                        return [2 /*return*/];
                    }
                    response.sendStatus(STATUS_CODE.CREATED);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    response.sendStatus(STATUS_CODE.SERVER_ERROR);
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function update_user_permission(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, permission_id, user_id, query, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = response.locals.safeData, permission_id = _a.permission_id, user_id = _a.user_id;
                    return [4 /*yield*/, users_repository.updateUserPermission({
                            permission_id: permission_id,
                            user_id: user_id
                        })];
                case 1:
                    query = _b.sent();
                    if (query.rowCount === 0) {
                        response.sendStatus(STATUS_CODE.SERVER_ERROR);
                        return [2 /*return*/];
                    }
                    response.sendStatus(STATUS_CODE.NO_CONTENT);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    console.log(error_2);
                    response.sendStatus(STATUS_CODE.SERVER_ERROR);
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function delete_user(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, query, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user_id = response.locals.safeData.id;
                    return [4 /*yield*/, users_repository.deleteUser(user_id)];
                case 1:
                    query = _a.sent();
                    if (query.rowCount === 0) {
                        response.sendStatus(STATUS_CODE.SERVER_ERROR);
                        return [2 /*return*/];
                    }
                    response.sendStatus(STATUS_CODE.OK);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    response.sendStatus(STATUS_CODE.SERVER_ERROR);
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function get_user(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, query, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user_id = response.locals.safeData.id;
                    return [4 /*yield*/, users_repository.getUser(user_id)];
                case 1:
                    query = _a.sent();
                    if (query.rowCount === 0) {
                        response.sendStatus(STATUS_CODE.SERVER_ERROR);
                        return [2 /*return*/];
                    }
                    response.send(query.rows[0]);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    response.sendStatus(STATUS_CODE.SERVER_ERROR);
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function get_user_by_name(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var search_name, query, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    search_name = response.locals.safeData.search_name;
                    return [4 /*yield*/, users_repository.getUserByName(search_name)];
                case 1:
                    query = _a.sent();
                    if (query.rowCount === 0) {
                        response.sendStatus(STATUS_CODE.NOT_FOUND);
                        return [2 /*return*/];
                    }
                    response.send(query.rows);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.log(error_5);
                    response.sendStatus(STATUS_CODE.SERVER_ERROR);
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function count_users(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var query, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, users_repository.countUsers()];
                case 1:
                    query = _a.sent();
                    response.send(query.rows[0].count);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.log(error_6);
                    response.sendStatus(STATUS_CODE.SERVER_ERROR);
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export { sign_up, update_user_permission, delete_user, get_user, get_user_by_name, count_users, };
