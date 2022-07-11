export const setItemToLs = (key, value) => {
  return localStorage.setItem(key, value);
};

export const getItemFromLs = (key) => {
  return localStorage.getItem(key);
};

export const removeItemFromLs = (key) => {
  return localStorage.removeItem(key);
};
