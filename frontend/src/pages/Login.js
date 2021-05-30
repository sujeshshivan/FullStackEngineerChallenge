import React from "react";
import { Form, Input, Button,  Card } from 'antd';
import { useHistory } from "react-router-dom";
import { login } from "../services/user-services";
import { toast } from 'react-toastify';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = () => {

  const history = useHistory();
  const onFinish = (values) => {
    console.log('Success:', values);
    login({
      "password": values.password,
      "username": values.username
    }).then((result) => {
      if (result?.data?.result[0]?.userId) {
        toast.success('You are successfully logged in', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("user", JSON.stringify(result?.data?.result[0]));
        history.push("/admin-landing");
      } else {
        toast.error("Login Failed, User not Found", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }).catch((err) => {
      toast.error("Login Failed, User not Found", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className='red-square'>
        <Card>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
        </Button>
            </Form.Item>
          </Form>
        </Card>

      </div>
    </>
  );
};

export default Login;


