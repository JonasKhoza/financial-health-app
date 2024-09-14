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
    else {
        console.log(err, err === null || err === void 0 ? void 0 : err.error);
        const error = {
            code: 500,
            message: "Something went wrong in our servers!",
            details: err === null || err === void 0 ? void 0 : err.error,
        };
        return res
            .status(500)
            .json(new response_model_1.ResponseStructure(false, null, null, error));
    }
}
exports.default = responseHelper;
