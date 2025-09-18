"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_routes_1 = __importDefault(require("./categories.routes"));
const categories_middlewares_1 = require("./categories.middlewares");
const maincategory_1 = __importDefault(require("./maincategory"));
const category_1 = __importDefault(require("./category"));
const subcategory_1 = __importDefault(require("./subcategory"));
const router = (0, express_1.Router)();
router.use("/", categories_middlewares_1.categoriesSecure, categories_routes_1.default);
router.use("/maincategory", maincategory_1.default);
router.use("/category", category_1.default);
router.use("/subcategory", subcategory_1.default);
exports.default = router;
