import React, { useState } from "react";
import { Space, Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalForm from "../modals/ModalForm";

const DepartmentTable = (props) => {
    const [items, setItems] = useState(props.listItems);
    const [openModal, setOpenModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const addItem = () => {
        setEditingItem(null);
        setOpenModal(true);
    };

    const deleteItem = (id) => {
        setItems(items.filter((Item) => Item.id !== id));
    };

    const editItem = (record) => {
        setEditingItem(record);
        setOpenModal(true);
    };

    const updateItem = (updatedItem) => {
        if (editingItem) {
            setItems(
                items.map((doc) =>
                    doc.id === updatedItem.id ? updatedItem : doc
                )
            );
        } else {
            setItems([...items, updatedItem]);
        }
        setOpenModal(false);
    };

    const columns = [
        {
            title: "Mã khoa/phòng",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên khoa/phòng",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => editItem(record)}>
                        Sửa
                    </Button>
                    <Button type="dashed" onClick={() => deleteItem(record.id)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={addItem}
                style={{ margin: 16 }}
            >
                Thêm khoa/phòng
            </Button>
            <Table columns={columns} dataSource={items} rowKey="id" />
            <ModalForm
                isModalOpen={openModal}
                setOpenModal={setOpenModal}
                item={editingItem}
                updateItem={updateItem}
            />
        </>
    );
};

export default DepartmentTable;
