import { Layout, Menu, theme } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import ErrorModal from "./errors/ErrorModal.js"
import Test from "./errors/ErrorModal.js";

const { Header } = Layout;

const labels = [
    { label: "Danh mục bác sĩ", path: "/doctor" },
    { label: "Danh mục khoa phòng", path: "/department" },
    { label: "Thông tin bệnh nhân", path: "/patient" },
];

const HeaderLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleMenuClick = (e) => {
        const selectedItem = labels[e.key];
        if (selectedItem) {
            navigate(selectedItem.path);
        }
    };

    const selectedKey = labels
        .findIndex((item) => item.path === location.pathname)
        .toString();

    const items = labels.map((item, index) => ({
        key: index,
        label: item.label,
    }));

    return (
        <div className="header-layout">
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[selectedKey]}
                    items={items}
                    onClick={handleMenuClick}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />
            </Header>
        </div>
    );
};

export default HeaderLayout;
