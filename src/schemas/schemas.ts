import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import joi_phone from "joi-phone-number";
import { CEP_REGEX } from "../enums/regexp.js";

const JoiPassword = Joi.extend(joiPasswordExtendCore);
const JoiPhone = Joi.extend(joi_phone);

const schemas = {
  sign_up_schema: Joi.object({
    name: Joi.string().min(1).max(32).required(),
    personal_email: Joi.string().min(1).email().required(),
    institutional_email: Joi.string().min(1).email().required(),
    phone: JoiPhone.string()
      .phoneNumber({
        defaultCountry: "BR",
        format: "international",
      })
      .required(),
    cep: Joi.string().pattern(CEP_REGEX).required(),
    address_number: Joi.string().max(6).required(),
    address_additional_information: Joi.string().min(0).max(256),
    institutional_id: Joi.string()
      .pattern(/[0-9]{7,10}/i)
      .required(),
  }),

  sign_in_schema: Joi.object({
    institutional_email: Joi.string().min(1).email().required(),
    password: JoiPassword.string()
      .min(8)
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
  }),

  idSchema: Joi.object({
    id: Joi.number().integer().required(),
  }),

  urlSchema: Joi.object({
    url: Joi.string().uri().required(),
  }),
};

export { schemas };
