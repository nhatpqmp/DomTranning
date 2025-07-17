import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const baseUrl = process.env.VITE_BASE_URL;

    const {notifications, settings} = await makeRequest(
      `https://${baseUrl}/clientApi/notifications?shopifyDomain=${shopifyDomain}`,
      `GET`
    );

    console.log('notifications', notifications);

    return {notifications, settings};
  };
}
