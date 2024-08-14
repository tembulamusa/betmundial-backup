import {toast} from "react-toastify";

const Notify = (message) => {
    let options = {
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: 673738 /* this is hack to prevent multiple toasts */
    }
    if (message.status === 200) {
        toast.success(`🚀 ${message.message}`, options);
    } else {
        toast.error(`🦄 ${message.message}`, options);
    }

};

export default Notify