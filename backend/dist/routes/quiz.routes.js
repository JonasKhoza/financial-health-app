"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    res.status(200).json({
        success: "Successfully posted quiz",
        data: req.body,
    });
});
exports.default = router;
