const Shopify = require('shopify-api-node');
import appConfig from '../config/app';

(async () => {
  const shopify = new Shopify({
    shopName: 'sales-pop-store-final.myshopify.com',
    accessToken: 'shpua_ac4731052f1014ea558a02366960d7cd'
  });
  const scriptTags = await shopify.scriptTag.list();

  console.log(scriptTags);
  await shopify.scriptTag.create({
    event: 'onload',
    src: `https://${appConfig.baseUrl}/scripttag/avada-sale-pop.min.js`
  });
  await shopify.scriptTag.delete(222442979362);
})();
