"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_handler_1 = __importDefault(require("../controllers/data.handler"));
class GeneralRoutes {
    constructor(router) {
        router.post('/api/validation-handler', data_handler_1.default.ValidationHandler);
    }
}
exports.default = GeneralRoutes;
//# sourceMappingURL=general.routes.js.map