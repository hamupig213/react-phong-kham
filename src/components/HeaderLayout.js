import { Layout, Menu, theme } from "antd";
import React from "react";
import { useNavigate } from "react-router";

const { Header } = Layout;

const labels = [
    { label: "Danh mục bác sĩ", path: "/doctor" },
    { label: "Danh mục khoa phòng", path: "/department" },
    { label: "Thông tin bệnh nhân", path: "/patient" },
];

const HeaderLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();

    const handleMenuClick = (e) => {
        const selectedItem = labels[e.key];
        if (selectedItem) {
            navigate(selectedItem.path);
        }
    };

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
                    defaultSelectedKeys={["0"]}
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
