import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


import { PageHeader, Button, Row, Card, Table, Space } from 'antd';
import { getReviewList } from "../services/review-services";

const columns = [
  // {
  //   title: 'Name',
  //   dataIndex: 'name',
  //   key: 'name',
  //   render: text => <a>{text}</a>,
  // },
  // {
  //   title: 'Email',
  //   dataIndex: 'email',
  //   key: 'email',
  // },
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
        <Button type="primary">Edit</Button>
        <Button type="danger">Delete</Button>
      </Space>
    ),
  },
];

function AdminReviewAdd() {
  let history = useHistory();

  const [initLoading, seInitLoading] = useState(true);
  const [userList, seUserList] = useState([]);
  const [pagination, sePagination] = useState({
    current: 1,
    pageSize: 10,
  });

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
    getReviewListByPage({ pagination });
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
                  <Button key="1" type="primary" onClick={() => { alert() }}>Add</Button>
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
    </>
  );
}

export default AdminReviewAdd;
