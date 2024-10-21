import { toast } from 'sonner';
import Toastify from 'toastify-js';

export const AlertSuccessNotification = ({
  text = 'Success',
  description,
}: {
  text?: string;
  description?: React.ReactNode;
}) => {
  return toast.success(description);
};

export const AlertDangerNotification = ({
  description,
}: {
  description: string;
}) => {
  return Toastify({
    text: description,
    className: 'info',
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    style: {
      background: `linear-gradient(to right, #FF0000, #FF0000)`,
    },
  }).showToast();
};
