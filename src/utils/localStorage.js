export const setItemToLs = async (key, value) => {
  return await localStorage.setItem(key, value);
};

export const getItemFromLs = (key) => {
  return localStorage.getItem(key);
};

export const removeItemFromLs = (key) => {
  return localStorage.removeItem(key);
};
