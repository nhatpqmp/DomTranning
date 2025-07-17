import Shopify from 'shopify-api-node';
import appConfig from '@functions/config/app';

export async function registerScriptTag({shopifyDomain, accessToken}) {
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken
  });
  const scriptTags = await shopify.scriptTag.list();
  console.log(scriptTags);
  await shopify.scriptTag.create({
    event: 'onload',
    src: `https://guitar-rational-about-allergy.trycloudflare.com/scripttag/avada-sale-pop.min.js`
  });
}
