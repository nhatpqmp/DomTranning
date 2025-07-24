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
    console.log(shopID);
    const settings = await getSettings(shopID);
    return (ctx.body = {
      data: settings,
      success: true
    });
  } catch (e) {
    console.error(e);
    return (ctx.body = {data: [], error: e.message});
  }
}

/**
 * @param {Context|Object|*} ctx
 * @returns {Promise<{success?: boolean, error?: string}>}
 */
export async function updateOne(ctx) {
  try {
    const {id, ...data} = ctx.req.body;
    await updateSetting(id, data);
    return (ctx.body = {success: true});
  } catch (e) {
    console.error(e);
    return (ctx.body = {error: e.message});
  }
}
