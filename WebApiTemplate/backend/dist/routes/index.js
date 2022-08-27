"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const general_routes_1 = __importDefault(require("./general.routes"));
const expressRouter = (0, express_1.Router)();
class InitRouter {
    constructor(app) {
        InitRouter.attachMiddlewares(app);
        InitRouter.init();
        app.use(expressRouter);
    }
    // add any new route class below
    static init() {
        new general_routes_1.default(expressRouter);
    }
    static attachMiddlewares(app) {
        app.use(body_parser_1.default.json());
        app.disable('x-powered-by');
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use((0, cookie_parser_1.default)());
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,  Accept, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET,POST,fetch, PATCH,OPTIONS,DELETE');
            res.header('Access-Control-Allow-Credentials', true);
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH,FETCH, DELETE, GET');
                return res.json({});
            }
            else {
                next();
            }
        });
        // app.use(express.static(path.join('../frontend/build')));
        app.get('/', async (req, res) => {
            try {
                res.sendFile(path_1.default.resolve('../frontend/index.html'));
            }
            catch (error) {
                console.log('files route error: ', error);
                res.end();
            }
        });
    }
}
exports.default = InitRouter;
//# sourceMappingURL=index.js.map