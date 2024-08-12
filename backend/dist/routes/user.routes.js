"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/profile", (req, res) => {
    res.status(200).json({ success: "Profiles path" });
});
exports.default = router;
