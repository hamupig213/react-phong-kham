import React from "react";
import { Button, notification, Space } from "antd";
const Test = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: "Notification Title",
            description:
                "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        });
    };
    return (
        <>
            {contextHolder}
            <Space>
                <Button onClick={() => openNotificationWithIcon("success")}>
                    Success
                </Button>
                <Button onClick={() => openNotificationWithIcon("info")}>
                    Info
                </Button>
                <Button onClick={() => openNotificationWithIcon("warning")}>
                    Warning
                </Button>
                <Button onClick={() => openNotificationWithIcon("error")}>
                    Error
                </Button>
            </Space>
        </>
    );
};
export default Test;
