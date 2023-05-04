/**
 *
 * @param num
 * @returns
 */
export const formatNumber = (num: string) => {
  return new Intl.NumberFormat("en-US").format(Number(num));
};

/**
 *
 * @param params object
 * @returns
 */
const getUrlSearch = (params = {}) =>
  Object.keys(params).length
    ? `?${new URLSearchParams(params).toString()}`
    : "";
/**
 *
 * @param url string
 * @param params object
 * @param options object
 * @returns
 */

export const requestAPI = async (url: string, params = {}, options = {}) => {
  try {
    const path = url + getUrlSearch(params);

    const response = await fetch(path, options);
    if (!response) return;

    if (!response?.ok) {
      throw new Error(`${response?.status} ${response?.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // TODO: errors reporting
    console.error(error);
    return null;
  }
};
