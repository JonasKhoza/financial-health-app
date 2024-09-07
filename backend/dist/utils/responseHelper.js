"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_model_1 = require("../models/response.model");
function responseHelper(res, err) {
    if (err instanceof response_model_1.CustomError) {
        const error = {
            code: err.code,
            message: err.message,
        };
        return res
            .status(err.code)
            .json(new response_model_1.ResponseStructure(false, null, null, error));
    }
}
exports.default = responseHelper;
