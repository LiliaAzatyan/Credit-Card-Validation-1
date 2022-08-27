"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = require("dotenv");
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routes"));
(0, dotenv_1.config)();
class App {
    constructor() {
        this.PORT = Number(process.env.PORT) || 8080;
        this.MODE = process.env.NODE_ENV || 'development';
        this.app = (0, express_1.default)();
        this.router = (0, express_1.Router)();
        this.app.use(this.router);
        this.server = http_1.default.createServer(this.app);
        this.connect();
        this.listen();
    }
    listen() {
        this.server.listen(this.PORT, () => {
            console.log(`App is listening on the port ${this.PORT} on ${this.MODE} mode`);
        });
    }
    async connect() {
        new routes_1.default(this.app);
    }
}
const app = new App();
process.on('uncaughtException', e => {
    console.log(e);
    process.exit(1);
});
process.on('unhandledRejection', e => {
    console.log(e);
    process.exit(1);
});
//# sourceMappingURL=app.js.map