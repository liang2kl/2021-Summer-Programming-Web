import { getVideoCount, getUserCount } from "./API"
import { useState, useEffect } from "react"
import { Statistic, Row, Col, Card, Layout, Menu, Breadcrumb } from 'antd';
import { UsergroupAddOutlined, VideoCameraOutlined } from '@ant-design/icons';
import "./IndexPage.css"

const { Header, Content, Footer } = Layout;

function IndexPage() {
  const [videoCount, setVideoCount] = useState(null)
  const [userCount, setUserCount] = useState(null)

  useEffect(() => {
    getVideoCount(count => setVideoCount(count))
    getUserCount(count => setUserCount(count))
  }, [])

  return <Layout className = "layout">
    <Content style={{ padding: '0 50px' }}>
      {/* <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
      {content()}
    </Content>
    <Footer className="footer">©2021 Liang Yesheng</Footer>
  </Layout >


  function content() {
    return <div className="center-content">
      <div className="title">Hello, World!</div>
      <Row gutter={16}>
        <Col span={12}>
          <Card className="card video-card" hoverable="true">
            <Statistic
              title="总视频数"
              value={videoCount}
              prefix={<VideoCameraOutlined />}
              loading={videoCount == null}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card className="card user-card" hoverable="true">
            <Statistic
              title="总用户数"
              value={userCount}
              loading={userCount == null}
              prefix={<UsergroupAddOutlined />}
            />
          </Card>
        </Col>
      </Row>  </div>
  }
}

export default IndexPage