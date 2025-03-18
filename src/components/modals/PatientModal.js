import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, Select } from "antd";
import { getAllDoctors } from "../../apis/DoctorApi";
import { getAllDepartments } from "../../apis/DepartmentApi";

const PatientModal = ({ isModalOpen, setOpenModal, item, updatePatient }) => {
    const [form] = Form.useForm();
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);

    // khởi tạo giá trị các trường trong modal
    useEffect(() => {
        form.setFieldsValue(
            item || {
                id: "",
                name: "",
                yoB: "",
                gender: "",
                phoneNumber: "",
                doctor: "",
                department: "",
            }
        );
    }, [item, form]);

    // lấy giá trị của doctors từ api
    useEffect(() => {
        const fetchDoctors = async () => {
            const res = await getAllDoctors(); // Chờ dữ liệu từ API
            setDoctors(res);
        };

        fetchDoctors(); // Gọi hàm bất đồng bộ
    }, []);

    // lấy giá trị của departments từ api
    useEffect(() => {
        const fetchDepartments = async () => {
            const res = await getAllDepartments(); // Chờ dữ liệu từ API
            setDepartments(res);
        };

        fetchDepartments(); // Gọi hàm bất đồng bộ
    }, []);

    const onFinish = (values) => {
        updatePatient(values);
    };

    return (
        <Modal
            title={item ? "Chỉnh sửa" : "Thêm"}
            open={isModalOpen}
            footer={null}
            onCancel={() => setOpenModal(false)}
        >
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    name="id"
                    label="Mã"
                    rules={[{ required: true, message: "Vui lòng nhập ID" }]}
                >
                    <Input disabled={!!item} />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Tên"
                    rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="yoB"
                    label="Năm sinh"
                    rules={[
                        { required: true, message: "Vui lòng nhập năm sinh" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Giới tính"
                    rules={[
                        { required: true, message: "Vui lòng nhập giới tính" },
                    ]}
                >
                    <Select
                        style={{ width: 200 }}
                        options={[
                            { label: "Nam", value: 1 },
                            { label: "Nữ", value: 2 },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số điện thoại",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Bác sĩ điều trị" name="doctor">
                    <Select>
                        {doctors.map((doc) => (
                            <Select.Option key={doc.id} value={doc.name}>
                                {doc.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Khoa/phòng" name="department">
                    <Select>
                        {departments.map((dep) => (
                            <Select.Option key={dep.id} value={dep.name}>
                                {dep.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {item ? "Cập nhật" : "Thêm"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PatientModal;
