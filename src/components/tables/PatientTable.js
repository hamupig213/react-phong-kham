import { Table, Button, Space, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import PatienModal from "../modals/PatientModal";
import axios from "axios";
import { getAllPatients } from "../../apis/PatientApi";
import { getAllDoctors } from "../../apis/DoctorApi";
import { getAllDepartments } from "../../apis/DepartmentApi";

const PatientTable = (props) => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchPatients = async () => {
            const res = await getAllPatients();
            setPatients(res);
        };

        fetchPatients();
    }, [refresh]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const res = await getAllDoctors();
            setDoctors(res);
        };

        fetchDoctors();
    }, []);

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
            await axios.delete(`https://localhost:7183/api/patient/${id}`);
            setPatients(patients.filter((item) => item.id !== id));
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
        const doctor = doctors.find((d) => d.id === updatedItem.doctor);
        const department = departments.find(
            (dep) => dep.id === updatedItem.department
        );

        const updatedData = {
            id: updatedItem.id,
            name: updatedItem.name,
            yoB: Number(updatedItem.yoB),
            gender: updatedItem.gender === 1 ? "Nam" : "Nữ",
            phoneNumber: updatedItem.phoneNumber,
            doctor: doctor,
            department: department,
        };

        console.log("Dữ liệu gửi lên API:", updatedData);

        if (editingItem) {
            try {
                await axios.put(
                    `https://localhost:7183/api/patient/${updatedItem.id}`,
                    updatedData
                );
                setPatients(
                    patients.map((doc) =>
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
                    "https://localhost:7183/api/patient",
                    updatedData
                );
                setPatients([...patients, response.data]);
                api.success({
                    message: "Thành công",
                    description: "Đã thêm mới thành công!",
                });
            } catch (error) {
                api.error({
                    message: "Lỗi",
                    description: error?.message || "Đã có lỗi xảy ra!!!",
                });
            }
        }
        setRefresh(!refresh);
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
            dataIndex: "yoB",
            key: "yoB",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Bác sĩ điều trị",
            dataIndex: "doctor",
            key: "doctor",
            render: (doctor) => doctor?.name || "Chưa có bác sĩ",
        },
        {
            title: "Khoa/phòng",
            dataIndex: "department",
            key: "department",
            render: (department) => department?.name || "Chưa có bác sĩ",
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
                Thêm bệnh nhân
            </Button>
            <Table columns={columns} dataSource={patients} />
            <PatienModal
                isModalOpen={openModal}
                setOpenModal={setOpenModal}
                item={editingItem}
                updatePatient={updateItem}
            />
        </>
    );
};

export default PatientTable;
