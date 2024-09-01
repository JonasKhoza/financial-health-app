"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function expressValidatorHelper(errors) {
    if (!errors.isEmpty()) {
        const error = {
            code: 400,
            message: "Validation error!",
            details: errors.array(),
        };
        return error;
    }
}
exports.default = expressValidatorHelper;
