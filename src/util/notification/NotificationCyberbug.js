import { notification } from "antd";


export const notificationFunction = (type, message, descriptions='') => {
    notification[type]({
        message: message,
        description:descriptions
    });
}