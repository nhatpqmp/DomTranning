import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const baseUrl = process.env.VITE_BASE_URL;

    const {notifications, settings} = await makeRequest(
      `${baseUrl}/clientApi/notifications?shopifyDomain=${shopifyDomain}`,
      `GET`
    );

    console.log('settting:', settings);

    return {notifications, settings};
  };
}
