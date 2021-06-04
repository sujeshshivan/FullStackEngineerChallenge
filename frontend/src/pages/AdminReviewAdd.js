import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


import { PageHeader, Button, Row, Card, Table, Space } from 'antd';
import { getReviewList } from "../services/review-services";
import { AdminReviewAddModal } from "../components/AdminReviewAddModal";

const initialValueFunc = () => ({ userId: '', reviewerId: '', name: '', reviewerName: '' })

function AdminReviewAdd() {
  let history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [modalType, setModalType] = useState('');
  const [initLoading, seInitLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [pagination, sePagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const columns = [
    {
      title: 'Employee',
      key: 'employee',
      render: (text, record) => (
        <Space size="middle">
          <div >{record?.userDetails?.name}</div>
        </Space>
      ),
    },
    {
      title: 'Reviewing Employee',
      key: 'reviewer',
      render: (text, record) => (
        <Space size="middle">
          <div >{record?.reviewerDetails?.name}</div>
        </Space>
      ),
    },
    {
      title: 'Review',
      dataIndex: 'review',
      key: 'review',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => { showModal("edit", record) }}>Edit</Button>
          {/* <Button type="danger">Delete</Button> */}
        </Space>
      ),
    },
  ];


  const onCreate = (values) => {
    console.log("values---------------------", values)
  }

  useEffect(() => {
    getReviewListByPage({ pagination: { ...pagination } });
  }, [])

  const getReviewListByPage = (params = {}) => {
    getReviewList({
      "page": params?.pagination?.current,
      "pageSize": params?.pagination?.pageSize
    }).then((result) => {
      if (result?.data?.result?.rows?.length > 0) {
        seInitLoading(false);
        setUserList(result.data.result.rows);
        sePagination({ ...params.pagination, total: result.data.result.total });
      } else {
        seInitLoading(false);
        setUserList([]);
        sePagination({ current: 1, pageSize: 10 });
      }
    }).catch((err) => {
      seInitLoading(false);
      setUserList([]);
      sePagination({ current: 1, pageSize: 10 });
    });
  }

  const handleTableChange = (pagination, filters, sorter) => {
    getReviewListByPage({ pagination });
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

  return (
    <>
      <PageHeader
        title="Review"
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
                title="Review List"
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
      <AdminReviewAddModal
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

export default AdminReviewAdd;
