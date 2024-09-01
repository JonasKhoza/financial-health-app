"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateContentType(expectedContentType) {
    return (req, res, next) => {
        const receivedContentType = req.headers["content-type"];
        console.log(expectedContentType);
        if (!(receivedContentType === null || receivedContentType === void 0 ? void 0 : receivedContentType.includes(expectedContentType))) {
            return res.status(415).json({
                success: false,
                error: {
                    code: 415,
                    message: `Unsupported Media Type: expected ${expectedContentType}`,
                },
            });
        }
        next();
    };
}
exports.default = validateContentType;
