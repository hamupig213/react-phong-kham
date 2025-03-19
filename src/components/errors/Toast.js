import React from "react";

import { ToastContainer, toast } from "react-toastify";

function Toast() {
    const notify = () => toast("Wow so easy!");

    return (
        <div>
            <ToastContainer />
        </div>
    );
}

export default Toast;
