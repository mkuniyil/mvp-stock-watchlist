export const MESSAGES_KEY = "messages";

export const removeKeyFromLocalstorage = (key: string) => {
  const keys = getKeysFromLocalstorage();
  const newKeys = keys.filter((k: string) => k !== key);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(newKeys));
};

export const saveKeyToLocalstorage = (key: string) => {
  const keys = getKeysFromLocalstorage();

  keys.push(key);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(keys));
};

export const getKeysFromLocalstorage = () => {
  const keys = localStorage.getItem(MESSAGES_KEY);
  return keys ? JSON.parse(keys) : [];
};
