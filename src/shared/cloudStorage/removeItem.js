export const removeItem = (key) => {
  if (!window.Telegram?.WebApp?.CloudStorage?.getItem || window.Telegram.WebApp?.version < 6.9) {
    return new Promise((resolve) => {
      localStorage.removeItem(key);
      resolve(true);
    });
  }

  return new Promise((resolve, reject) => {
    window.Telegram.WebApp.CloudStorage.removeItem(key, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
}