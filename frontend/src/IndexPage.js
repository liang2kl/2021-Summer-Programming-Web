import { Link } from 'react-router-dom'

import { Statistic, Row, Col, Card, Layout } from 'antd';
import { FundFilled, PlaySquareFilled } from '@ant-design/icons';
import "./IndexPage.css"

const { Content, Footer } = Layout;

function IndexPage(props) {

  const videoCount = props.videos
  const userCount = props.users

  return <Layout className = "layout">
    <Content style={{ padding: '0 50px' }} className="content">
      {content()}
    </Content>
    <Footer className="footer">©2021 Liang Yesheng</Footer>
  </Layout >


  function content() {
    return <div className="center-content">
      <div className="title">Hello, World!</div>
      <Row gutter={16}>
        <Col span={12}>
          <Link to="/videos">
            <Card className="card video-card" hoverable="true">
              <Statistic
                title="总视频数"
                value={videoCount}
                prefix={<PlaySquareFilled />}
                loading={videoCount == null}
                valueStyle={{ fontFamily: "monaco" }}
              />
            </Card>
          </Link>
        </Col>
        <Col span={12}>
          <Card className="card user-card" hoverable="true">
            <Statistic
              title="总用户数"
              value={userCount}
              loading={userCount == null}
              prefix={<FundFilled />}
              valueStyle={{ fontFamily: "monaco" }}
            />
          </Card>
        </Col>
      </Row>

      </div>
  }
}

export default IndexPage