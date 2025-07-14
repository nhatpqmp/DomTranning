import App from 'koa';
import createErrorHandler from '@functions/middleware/errorHandler';
import {verifyRequest} from '@avada/core';
import * as errorService from '@functions/services/errorService';

const api = new App();
api.proxy = true;

api.use(createErrorHandler());
api.use(verifyRequest());

api.on('error', errorService.handleError);

export default api;
