import { useToast, POSITION } from "vue-toastification";
export const Success =  (texto: String) => {
    const toast = useToast();
    toast.success(texto, { 
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        position: POSITION.BOTTOM_RIGHT,
        icon: true,
        rtl: false
    });
    return toast;
};
export const SuccessTop =  (texto: String) => {
    const toast = useToast();
    toast.success(texto, { 
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        position: POSITION.BOTTOM_RIGHT,
        icon: true,
        rtl: false
    });
    return toast;
};
export const ErrorTop =  (texto: String) => {
    const toast = useToast();
    toast.error(texto, { 
        timeout: 3300,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        position: POSITION.TOP_CENTER,
        icon: true,
        rtl: false
    });
    return toast;
};

export const Error =  (texto: String) => {
    const toast = useToast();
    toast.error(texto, { 
        timeout: 3300,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        position: POSITION.BOTTOM_RIGHT,
        icon: true,
        rtl: false
    });
    return toast;
};

export const Advertencia =  (texto: String) => {
    const toast = useToast();
    toast.warning(texto, { 
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        position: POSITION.TOP_CENTER,
        icon: true,
        rtl: false
    });
    return toast;
};

export const AdvertenciaTop =  (texto: String) => {
    const toast = useToast();
    toast.warning(texto, { 
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
    });
    return toast;
};



const Notif = {
    Success,
    SuccessTop,
    Error,
    ErrorTop,
    Advertencia,
    AdvertenciaTop
  };

  export default Notif;