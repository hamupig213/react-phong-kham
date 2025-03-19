import React, { useEffect, useState } from "react";
import { Space, Table, Button, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalForm from "../modals/ModalForm";
import axios from "axios";
import { getAllDoctors } from "../../apis/DoctorApi.js";

const DoctorTable = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchDoctors = async () => {
            const res = await getAllDoctors(); // Chờ dữ liệu từ API
            setDoctors(res);
        };

        fetchDoctors(); // Gọi hàm bất đồng bộ
    }, []);

    const addItem = () => {
        setEditingItem(null);
        setOpenModal(true);
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`https://localhost:7183/api/doctor/${id}`);
            setDoctors(doctors.filter((item) => item.id !== id));
            api.info({
                message: "Thành công",
                description: "Đã xóa thành công!",
            });
        } catch (error) {
            api.error({
                message: "Lỗi",
                description: error?.message || "Đã có lỗi xảy ra!!!",
            });
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
                    `https://localhost:7183/api/doctor/${updatedItem.id}`,
                    updatedItem
                );
                setDoctors(
                    doctors.map((doc) =>
                        doc.id === updatedItem.id ? updatedItem : doc
                    )
                );
                api.success({
                    message: "Thành công",
                    description: "Đã cập nhật thành công!",
                });
            } catch (error) {
                api.error({
                    message: "Lỗi",
                    description: error?.message || "Đã có lỗi xảy ra!!!",
                });
            }
        } else {
            try {
                const response = await axios.post(
                    "https://localhost:7183/api/doctor",
                    updatedItem
                );
                setDoctors([...doctors, response.data]); // Cập nhật danh sách bác sĩ từ phản hồi API
                api.success({
                    message: "Thành công",
                    description: "Đã thêm bác sĩ thành công!",
                });
            } catch (error) {
                api.error({
                    message: "Lỗi",
                    description: error?.message || "Đã có lỗi xảy ra!!!",
                });
            }
        }
        setOpenModal(false);
    };

    const columns = [
        {
            title: "Mã bác sĩ",
            dataIndex: "id",
            key: "id",
            defaultSortOrder: "ascend",
            sorter: (a, b) => a.id.localeCompare(b.id),
        },
        {
            title: "Tên bác sĩ",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
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
            {contextHolder}
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={addItem}
                style={{ margin: 16 }}
            >
                Thêm bác sĩ
            </Button>
            <Table columns={columns} dataSource={doctors} rowKey="id" />
            <ModalForm
                isModalOpen={openModal}
                setOpenModal={setOpenModal}
                item={editingItem}
                updateItem={updateItem}
            />
        </>
    );
};

export default DoctorTable;
