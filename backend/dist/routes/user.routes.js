"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/auth", (req, res) => {
    res
        .status(200)
        .json({ success: "Successfully hit the endpoint.", data: req.body });
});
router.post("/auth/profile", (req, res) => {
    res.status(200).json({ success: "Profiles path", data: req.body });
});
exports.default = router;
