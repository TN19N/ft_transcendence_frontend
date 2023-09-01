import { toast } from "react-toastify";

export const errorMsg = (errormsg: string) => {
  toast.error(errormsg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};