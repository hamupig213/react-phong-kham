import { Table, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import PatienModal from "../modals/PatientModal";

const PatientTable = (props) => {
    const [items, setItems] = useState(props.patients);
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
            title: "Mã bệnh nhân",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên bệnh nhân",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Năm sinh",
            dataIndex: "birth_year",
            key: "birth_year",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone_number",
            key: "phone_number",
        },
        {
            title: "Bác sĩ điều trị",
            dataIndex: "doctor",
            key: "doctor",
        },
        {
            title: "Khoa/phòng",
            dataIndex: "department",
            key: "department",
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
                Thêm bệnh nhân
            </Button>
            <Table columns={columns} dataSource={items} />
            <PatienModal
                isModalOpen={openModal}
                setOpenModal={setOpenModal}
                item={editingItem}
                updatePatient={updateItem}
                doctors={props.doctors}
                departments={props.departments}
            />
        </>
    );
};

export default PatientTable;
