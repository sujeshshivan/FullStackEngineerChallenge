import React, { useEffect } from "react";

import { Modal, Form, Input } from 'antd';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


export const AdminReviewAddModal = ({ visible, onCreate, onCancel, initialValues, modalType }) => {

    const [form] = Form.useForm();

    useEffect(() => {

        console.log("initialValues-----------------", initialValues);
        form.setFieldsValue(initialValues)
    }, [form, initialValues])

    return (
        <Modal
            visible={visible}
            title={modalType === 'edit' ? "Edit review" : "Create a new review"}
            okText={modalType === 'edit' ? "Update" : "Create"}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={initialValues}
            >
                <Form.Item
                    label="Review"
                    name="review"
                    // rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    );
};
