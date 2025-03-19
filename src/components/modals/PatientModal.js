import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, Select } from "antd";
import { getAllDoctors } from "../../apis/DoctorApi";
import { getAllDepartments } from "../../apis/DepartmentApi";

const PatientModal = ({ isModalOpen, setOpenModal, item, updatePatient }) => {
    const [form] = Form.useForm();
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        if (item) {
            form.setFieldsValue({
                id: item.id,
                name: item.name,
                yoB: item.yoB,
                gender: item.gender,
                phoneNumber: item.phoneNumber,
                doctor: item.doctor.id,
                department: item.department.id,
            });
        } else {
            form.resetFields();
        }
    }, [item, isModalOpen]);

    // lấy giá trị của doctors từ api
    useEffect(() => {
        const fetchDoctors = async () => {
            const res = await getAllDoctors();
            setDoctors(res);
        };

        fetchDoctors();
    }, []);

    // lấy giá trị của departments từ api
    useEffect(() => {
        const fetchDepartments = async () => {
            const res = await getAllDepartments();
            setDepartments(res);
        };

        fetchDepartments();
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
                    //initialValue={item?.id ?? null}
                    rules={[{ required: true, message: "Vui lòng nhập ID" }]}
                >
                    <Input disabled={!!item} />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Tên"
                    //initialValue={item?.name ?? null}
                    rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="yoB"
                    label="Năm sinh"
                    //initialValue={item?.yoB ?? null}
                    rules={[
                        { required: true, message: "Vui lòng nhập năm sinh" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Giới tính"
                    //initialValue={item?.gender ?? null}
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
                    //initialValue={item?.phoneNumber ?? null}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số điện thoại",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Bác sĩ điều trị"
                    name="doctor"
                    initialValue={item?.doctor?.id ?? null}
                >
                    <Select
                        options={doctors.map((d) => {
                            return { label: d.name, value: d.id };
                        })}
                    />
                </Form.Item>
                <Form.Item
                    label="Khoa/phòng"
                    name="department"
                    initialValue={item?.department?.id ?? null}
                >
                    <Select
                        options={departments.map((d) => {
                            return { label: d.name, value: d.id };
                        })}
                    />
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
