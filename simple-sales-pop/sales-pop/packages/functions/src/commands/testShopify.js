const Shopify = require('shopify-api-node');

(async () => {
  const shopify = new Shopify({
    shopName: 'sales-pop-store-final.myshopify.com',
    accessToken: 'shpua_ac4731052f1014ea558a02366960d7cd'
  });

  await shopify.scriptTag.delete(222454349858);
  const scriptTags = await shopify.scriptTag.list();

  console.log(scriptTags);
})();
