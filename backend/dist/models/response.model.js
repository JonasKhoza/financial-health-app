"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.ResponseStructure = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.code = statusCode;
    }
}
exports.CustomError = CustomError;
class ResponseStructure {
    constructor(s, d, mt, err) {
        (this.success = s),
            (this.data = d),
            (this.metadata = mt),
            (this.error = err);
    }
}
exports.ResponseStructure = ResponseStructure;
