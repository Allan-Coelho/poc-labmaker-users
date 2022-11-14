var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { stripHtml } from "string-strip-html";
import { STATUS_CODE } from "../protocols/status_code.js";
var propertiesToSanitize = [
    "name",
    "personal_email",
    "institutional_email",
    "phone",
    "cep",
    "address_number",
    "address_additional_information",
    "institutional_id",
    "user_id",
    "permission_id",
    "id",
    "search_name",
];
function html_sanitizer(request, response, next) {
    var requestObjectsToSanitize = [
        "headers",
        "body",
        "query",
        "params",
    ];
    try {
        for (var j = 0, len0 = requestObjectsToSanitize.length; j < len0; j++) {
            var objectKey = requestObjectsToSanitize[j];
            var object = request === null || request === void 0 ? void 0 : request[objectKey];
            if (!object) {
                continue;
            }
            for (var i = 0, len1 = propertiesToSanitize.length; i < len1; i++) {
                var propertyName = propertiesToSanitize[i];
                var propertyValue = String(object === null || object === void 0 ? void 0 : object[propertyName]);
                if (propertyValue === "undefined" || propertyValue === undefined) {
                    continue;
                }
                response.locals[objectKey] = __assign({}, response.locals[objectKey]);
                response.locals[objectKey][propertyName] =
                    stripHtml(propertyValue).result;
            }
        }
        next();
    }
    catch (error) {
        console.log("html sanitizer error");
        console.log(error);
        response.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}
export { html_sanitizer };
