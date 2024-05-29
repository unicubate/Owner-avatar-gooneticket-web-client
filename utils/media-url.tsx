import { useEffect, useState } from 'react';

type ThumbnailStatusCache = {
  [key in string]: {
    status: number;
  };
};

const cache: ThumbnailStatusCache = {};

/*
 * sync methods
 */

export const fallbackURL = (fallback?: string) => fallback ?? '';

/**
 * @deprecated sync method, not usable
 * @param image_url
 * @returns boolean
 */
export const imageExists = (image_url?: string) => {
  if (!image_url) {
    return false;
  }

  if (cache[image_url]) {
    return cache[image_url].status == 200;
  }

  try {
    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    cache[image_url] = { status: http.status };

    return http.status == 200;
  } catch (e) {
    return false;
  }
};

export const mediaURL = (
  name?: string | null,
  path?: string,
  fallback?: string,
) => {
  const url = (process.env.NEXT_MEDIA_HOST ?? '') + path + '/' + name;

  return name && process.env.NEXT_MEDIA_HOST /*&& imageExists(url)*/
    ? url
    : fallbackURL(fallback);
};

/*
 * async methods
 */

export const asyncImageExists = async (image_url?: string) => {
  if (!image_url) {
    return false;
  }

  if (cache[image_url]) {
    return cache[image_url].status == 200;
  }

  try {
    const http = await fetch(image_url, { method: 'HEAD' });

    cache[image_url] = { status: http.status };

    return http.status == 200;
  } catch (e) {
    return false;
  }
};

export const asyncMediaURL = async (
  name?: string | null,
  path?: string,
  fallback?: string,
  noCheck?: boolean,
) => {
  const url = (process.env.NEXT_MEDIA_HOST ?? '') + path + '/' + name;

  const isImagePresent = !noCheck ? await asyncImageExists(url) : true;

  return name && process.env.NEXT_MEDIA_HOST && isImagePresent
    ? url
    : fallbackURL(fallback);
};

export const useAsyncMediaURL = (
  name?: string | null,
  path?: string,
  fallback?: string,
  noCheck?: boolean,
) => {
  const [url, setUrl] = useState<string>(fallbackURL(fallback));

  useEffect(() => {
    const getAsyncMediaUrl = async () => {
      const imageUrl = await asyncMediaURL(name, path, fallback, noCheck);
      setUrl(imageUrl);
    };
    getAsyncMediaUrl();
  }, [name, path, fallback, noCheck]);

  return url;
};
