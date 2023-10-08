export const getItem = (key) => {
  if (!window.Telegram?.WebApp?.CloudStorage?.getItem || window.Telegram.WebApp?.version < 6.9) {
    return new Promise((resolve) => {
      resolve(localStorage.getItem(key));
    });
  }

  return new Promise((resolve, reject) => {
    window.Telegram.WebApp.CloudStorage.getItem(key, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
}