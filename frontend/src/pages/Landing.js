import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { PageHeader, Button, Row, Card, Table, Space, Modal, Form, Input, InputNumber } from 'antd';

import { getUserList, updateUser, createUser, deleteUser } from "../services/user-services";
import { UserModal } from "../components/UserModal";


const initialValueFunc = () => ({ name: '', username: '', email: '', age: '', password: '' })


function Landing() {
  let history = useHistory();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => { showModal("edit", record) }}>Edit</Button>
          {record.userRole !== 1 && <Button type="danger" onClick={() => { onDelete(record) }}>Delete</Button>}
        </Space>
      ),
    },
  ];


  const [initLoading, seInitLoading] = useState(true);
  const [userList, seUserList] = useState([]);
  const [pagination, sePagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [modalType, setModalType] = useState('');

  const onCreate = (values) => {
    if (modalType === 'edit' && initialValues.userId) {
      values.userId = initialValues.userId;
      updateUser(values).then((result) => {
        getUserListByPage({ pagination: { ...pagination } });
        toast.success('Successfully updated user ', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsModalVisible(false);
      }).catch((err) => {
        toast.success('User not updated. something went wrong ', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      });
    } else {
      createUser(values).then((result) => {
        getUserListByPage({ pagination: { ...pagination } });
        toast.success('Successfully added new user ', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsModalVisible(false);
      }).catch((err) => {
        toast.success('User not added. something went wrong ', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      });
    }
  };

  useEffect(() => {
    getUserListByPage({ pagination: { ...pagination } });
  }, [])

  const getUserListByPage = (params = {}) => {
    seInitLoading(true);
    seUserList([]);
    getUserList({
      "page": params?.pagination?.current,
      "pageSize": params?.pagination?.pageSize
    }).then((result) => {
      if (result?.data?.result?.rows?.length > 0) {
        seInitLoading(false);
        seUserList(result.data.result.rows);
        sePagination({ ...params.pagination, total: result.data.result.total });
      } else {
        seInitLoading(false);
        seUserList([]);
        sePagination({ current: 1, pageSize: 10 });
      }
    }).catch((err) => {
      seInitLoading(false);
      seUserList([]);
      sePagination({ current: 1, pageSize: 10 });
    });
  }

  const handleTableChange = (pagination, filters, sorter) => {
    getUserListByPage({ pagination });
  };

  const showModal = (type, value) => {
    setModalType(type);
    if (type === 'edit') {
      setInitialValues({ ...value });
    } else {
      setInitialValues(initialValueFunc);
    }
    setIsModalVisible(true);
  };

  const onDelete = (values) => {
    if (values.userId) {
      deleteUser(values).then((result) => {
        getUserListByPage({ pagination: { ...pagination } });
        toast.success('deleted user ', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }).catch((err) => {
        toast.success('User not deleted. something went wrong ', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      });
    }
  };

  return (
    <>
      <PageHeader
        title="Users"
        extra={[
          <Button key="3" onClick={() => { history.push("/admin-landing"); }}>Users</Button>,
          <Button key="2" onClick={() => { history.push("/review-add"); }}>Performance</Button>,
          <Button key="1" type="primary" onClick={() => { localStorage.clear(); history.push("/login"); }}>Logout</Button>,
        ]}
      >
        <Row>
          <div style={{ flex: 1 }}>
            <>
              <Card
                style={{ marginTop: 16 }}
                type="inner"
                title="User List"
                extra={
                  <Button key="1" type="primary" onClick={() => { showModal("add", null) }}>Add</Button>
                }
              >
                <Table
                  columns={columns}
                  dataSource={userList}
                  rowKey={record => record.user_id}
                  pagination={pagination}
                  loading={initLoading}
                  onChange={handleTableChange}
                />
              </Card>
            </>
          </div>
        </Row>
      </PageHeader>
      <UserModal
        visible={isModalVisible}
        onCreate={onCreate}
        onCancel={() => {
          setIsModalVisible(false);
          setInitialValues(initialValueFunc);
        }}
        initialValues={initialValues}
        modalType={modalType}
      />
    </>
  );
}
export default Landing;
