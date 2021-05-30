import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


import { PageHeader, Button, Row, Card, Table, Space } from 'antd';
import { getReviewList } from "../services/review-services";

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
        <Button type="primary">Edit</Button>
        <Button type="danger">Delete</Button>

        {/* <a>Edit</a>
        <a>Delete</a> */}
      </Space>
    ),
  },
];

function ReviewPerformance() {
  let history = useHistory();

  const [initLoading, seInitLoading] = useState(true);
  const [userList, seUserList] = useState([]);
  const [pagination, sePagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    getReviewList({ pagination: { ...pagination } });
  }, [])

  const getReviewList = (params = {}) => {
    getReviewList({
      "page": params?.pagination?.current,
      "pageSize": params?.pagination?.pageSize
    }).then((result) => {
      console.log(`result-----------------`, result)
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
    getReviewList({ pagination });
  };

  return (
    <>
      <PageHeader
        title="Users"
        extra={[
          <Button key="3" onClick={() => { history.push("/admin-landing"); }}>Users</Button>,
          <Button key="2" onClick={() => { history.push("/performance"); }}>Performance</Button>,
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
              {/* <PageHeader
                title="Users List"
                extra={[
                  <Button key="2">Add</Button>,
                ]}
              >
                <Row>
                  <Paragraph>
                    sjancjbdsviubeiuvbiubvisuldnviusdbvnowhnfvlwiaubifygbnO;C IUEVbUEGBF0QW839la;d9wdbcv s;ojdmo9ahdiuabcfhbcaksjnc09j  sqiHIHN
                </Paragraph>
                </Row>
              </PageHeader> */}
            </>
          </div>
        </Row>
      </PageHeader>
      {/* Landing */}
      {/* <Button  >click me</Button> */}
    </>
  );
}

export default ReviewPerformance;
