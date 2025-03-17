import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

const ModalForm = ({ isModalOpen, setOpenModal, item, updateItem }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(item || { id: "", name: "" });
    }, [item, form]);

    const onFinish = (values) => {
        updateItem(values);
    };

    return (
        <Modal
            title={item ? "Chỉnh sửa" : "Thêm"}
            open={isModalOpen}
            footer={null}
            onCancel={() => setOpenModal(false)}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Mã"
                    name="id"
                    rules={[{ required: true, message: "Vui lòng nhập mã!" }]}
                >
                    <Input disabled={!!item} />
                </Form.Item>
                <Form.Item
                    label="Tên"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên bác sĩ!",
                        },
                    ]}
                >
                    <Input />
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

export default ModalForm;
