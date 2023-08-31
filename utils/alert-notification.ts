import Toastify from "toastify-js";

export const AlertSuccessNotification = (options: {
  text: string;
  className: string;
  gravity: "top" | "bottom";
  position: "left" | "center" | "right";
}) => {
  const { text, className, gravity, position } = options;
  return Toastify({
    text: text,
    className: className,
    gravity: gravity, // `top` or `bottom`
    position: position, // `left`, `center` or `right`
    style: {
      background: `linear-gradient(to right, ##0d6efd, ##0d6efd)`,
    },
  }).showToast();
};

export const AlertDangerNotification = (options: {
  text: string;
  className: string;
  gravity: "top" | "bottom";
  position: "left" | "center" | "right";
}) => {
  const { text, className, gravity, position } = options;
  return Toastify({
    text: text,
    className: className,
    gravity: gravity, // `top` or `bottom`
    position: position, // `left`, `center` or `right`
    style: {
      background: `linear-gradient(to right, #FF0000, #FF0000)`,
    },
  }).showToast();
};
