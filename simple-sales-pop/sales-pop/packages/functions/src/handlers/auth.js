import App from 'koa';
import 'isomorphic-fetch';
import {contentSecurityPolicy, getShopByShopifyDomain, shopifyAuth} from '@avada/core';
import shopifyConfig from '@functions/config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from 'firebase-admin';
import appConfig from '@functions/config/app';
import shopifyOptionalScopes from '@functions/config/shopifyOptionalScopes';
import {afterInstall} from '@functions/services/affterInstallService';
import {createWebhooks, registerWebhook} from '@functions/services/webhookService';
import shopify from '@functions/config/shopify';
import {initShopify} from '../../lib/services/shopifyService';

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());
app.use(contentSecurityPolicy(true));

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    accessTokenKey: shopifyConfig.accessTokenKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/embed',
    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    },
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    afterThemePublish: ctx => {
      // Publish assets when theme is published or changed here
      return (ctx.body = {
        success: true
      });
    },
    afterInstall: async ctx => {
      try {
        const shopifyDomain = ctx.state.shopify.shop;
        const shop = await getShopByShopifyDomain(shopifyDomain);
        const baseTasks = [afterInstall(ctx)];
        const tasks =
          appConfig.baseUrl !== 'joy.avada.io' && appConfig.baseUrl.includes('trycloudflare')
            ? [...baseTasks, registerWebhook(shopifyDomain, shop.accessToken)]
            : baseTasks;
        await Promise.all(tasks);
      } catch (e) {
        console.error(`Failed to handle after install:`, e);
      }
    },
    optionalScopes: shopifyOptionalScopes
  }).routes()
);

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;
