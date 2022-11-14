import Joi from "joi";
import joi_phone from "joi-phone-number";
import { CEP_REGEX } from "../enums/regexp.js";
var JoiPhone = Joi.extend(joi_phone);
var schemas = {
    sign_up_schema: Joi.object({
        name: Joi.string().min(1).max(32).required(),
        personal_email: Joi.string().min(1).email().required(),
        institutional_email: Joi.string().min(1).email().required(),
        phone: JoiPhone.string()
            .phoneNumber({
            defaultCountry: "BR",
            format: "international"
        })
            .required(),
        cep: Joi.string().pattern(CEP_REGEX).required(),
        address_number: Joi.string().max(6).required(),
        address_additional_information: Joi.string().min(0).max(256),
        institutional_id: Joi.string()
            .pattern(/[0-9]{7,10}/i)
            .required()
    }),
    update_user_permission_schema: Joi.object({
        permission_id: Joi.number().integer().required(),
        user_id: Joi.number().integer().required()
    }).unknown(false),
    id_schema: Joi.object({
        id: Joi.number().integer().required()
    }),
    urlSchema: Joi.object({
        url: Joi.string().uri().required()
    }),
    search_user: Joi.object({
        search_name: Joi.string().min(3).required()
    })
};
export { schemas };
