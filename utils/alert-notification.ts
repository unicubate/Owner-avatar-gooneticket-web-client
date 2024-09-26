import Toastify from 'toastify-js';

export const AlertSuccessNotification = (options: { text: string }) => {
  const { text } = options;
  return Toastify({
    text: text,
    className: 'info',
    gravity: 'bottom', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    style: {
      background: `linear-gradient(to right, #1d4ed8, #1d4ed8)`,
    },
  }).showToast();
};

export const AlertDangerNotification = (options: { text: string }) => {
  const { text } = options;
  return Toastify({
    text: text,
    className: 'info',
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    style: {
      background: `linear-gradient(to right, #FF0000, #FF0000)`,
    },
  }).showToast();
};
