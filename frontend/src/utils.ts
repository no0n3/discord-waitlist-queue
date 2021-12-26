const LOGGED_USER_KEY_NAME = 'wl_logged_user_data';

export const timeAgo = (time: number) => {
  if (!time) return 'n/a';

  const now = Date.now() / 1000;
  let d = now - time / 1000;
  if (d < 60) {
    return 'Just joined';
  }

  d = Math.floor(d / 60);
  if (d < 60) {
    return `${d} minute${1 < d ? 's' : ''} ago`;
  }

  d = Math.floor(d / 60);
  if (d < 24) {
    return `${d} hour${1 < d ? 's' : ''} ago`;
  }

  d = Math.floor(d / 24);
  if (d < 7) {
    return `${d} day${1 < d ? 's' : ''} ago`;
  }

  return 'n/a';
};

const parseJson = (json: string | null) => {
  if (!json) return null;

  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};

export const removeLoggedUserData = () => localStorage.removeItem(LOGGED_USER_KEY_NAME);

export const addLoggedUserData = (userData: any) => localStorage.setItem(LOGGED_USER_KEY_NAME, JSON.stringify(userData));

export const getLoggedUserData = () => parseJson(localStorage.getItem(LOGGED_USER_KEY_NAME));

export const getHashValue = (key: string) => {
  const matches = window.location.hash.match(new RegExp(key + '=([^&]*)'));

  return matches ? matches[1] : null;
};

export const redirect = (url: string) => {
  if (!url) return;

  window.location.href = url;
};

export const handleHttpError = (error: any) => {
  if (error.response.status == 401) {
    removeLoggedUserData();

    redirect('/');
  }
};
