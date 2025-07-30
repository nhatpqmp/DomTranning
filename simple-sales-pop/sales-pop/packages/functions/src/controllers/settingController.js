import {getCurrentShop} from '@functions/helpers/auth';
import {getSettings, updateSetting} from '@functions/repositories/settingRepository';

/**
 *
 * @param ctx
 * @returns {Promise<{data: ({[p: string]: FirebaseFirestore.DocumentFieldValue, id: string}|*[]), success: boolean}|{data: *[], error}>}
 */
export async function getOne(ctx) {
  try {
    const shopID = getCurrentShop(ctx);
    const settings = await getSettings(shopID);
    return (ctx.body = {
      data: settings,
      success: true
    });
  } catch (e) {
    console.log('Error while getting settings', e);
    return (ctx.body = {data: [], error: e.message});
  }
}

/**
 *
 * @param {Context|Object|*} ctx
 * @returns {Promise<{success?: boolean, error?: string}>}
 */
export async function updateOne(ctx) {
  try {
    const shopID = getCurrentShop(ctx);
    const currentSettings = await getSettings(shopID);
    const {id, ...data} = ctx.req.body;

    if (!currentSettings) {
      return (ctx.body = {error: 'Setting not found'});
    }
    if (currentSettings.shopId !== data.shopId) {
      return (ctx.body = {error: 'Invalid shop ID'});
    }

    await updateSetting(id, data);
    return (ctx.body = {success: true});
  } catch (e) {
    console.log('Error while updating settings', e);
    return (ctx.body = {error: e.message});
  }
}
