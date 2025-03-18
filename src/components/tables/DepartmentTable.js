import React, { useState, useEffect } from "react";
import { Space, Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalForm from "../modals/ModalForm";
import axios from "axios";
import { getAllDepartments } from "../../apis/DepartmentApi";

const DepartmentTable = (props) => {
    const [departments, setDepartments] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            const res = await getAllDepartments();
            setDepartments(res);
        };
        fetchDepartments();
    }, []);

    const addItem = () => {
        setEditingItem(null);
        setOpenModal(true);
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`https://localhost:7183/api/department/${id}`);
            setDepartments(departments.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Lỗi khi xóa khoa/phòng:", error);
        }
    };

    const editItem = (record) => {
        setEditingItem(record);
        setOpenModal(true);
    };

    const updateItem = async (updatedItem) => {
        if (editingItem) {
            try {
                await axios.put(
                    `https://localhost:7183/api/department/${updatedItem.id}`,
                    updatedItem
                );
                setDepartments(
                    departments.map((doc) =>
                        doc.id === updatedItem.id ? updatedItem : doc
                    )
                );
            } catch (error) {
                console.error("Lỗi khi cập nhật khoa/phòng:", error);
            }
        } else {
            try {
                const response = await axios.post(
                    "https://localhost:7183/api/department",
                    updatedItem
                );
                setDepartments([...departments, response.data]); // Cập nhật danh sách bác sĩ từ phản hồi API
            } catch (error) {
                console.error("Lỗi khi thêm khoa/phòng:", error);
            }
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
            <Table columns={columns} dataSource={departments} rowKey="id" />
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
