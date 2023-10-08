export const setItem = (key, value) => {
  if (!window.Telegram?.WebApp?.CloudStorage?.setItem || window.Telegram.WebApp?.version < 6.9) {
    return new Promise((resolve) => {
      localStorage.setItem(key, value);
      resolve(true);
    });
  }

  return new Promise((resolve, reject) => {
    window.Telegram.WebApp.CloudStorage.setItem(key, value, (error, isSaved) => {
      if (error) {
        reject(error);
      }

      resolve(isSaved);
    });
  });
}