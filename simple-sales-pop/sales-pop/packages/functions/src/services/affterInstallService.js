import {installShopHandler} from '@functions/controllers/notificationController';
import {createSetting, getSetting} from '@functions/repositories/settingRepository';
import defaultSetting from '@functions/install/defaultSetting';

export async function afterInstall() {
  try {
    await Promise.all([syncOrder(), addDefaultSetting()]);
  } catch (e) {
    console.error(`Failed to handle after install`, e);
  }
}

export async function syncOrder() {
  try {
    await installShopHandler();
    console.log('Successfully sync order');
  } catch (e) {
    console.error(`Failed to sync order:`, e);
  }
}

export async function addDefaultSetting() {
  try {
    const currentSetting = await getSetting();
    if (!currentSetting) {
      const setting = defaultSetting;
      await createSetting(setting);
    }
    console.log('Successfully add default setting');
  } catch (e) {
    console.error(`Failed to add default setting:`, e);
  }
}
