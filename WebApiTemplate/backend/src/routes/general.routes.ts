import DataHandler from '../controllers/data.handler';

export default class GeneralRoutes {
    constructor(router) {
        router.post('/api/validation-handler', DataHandler.ValidationHandler);
    }
}