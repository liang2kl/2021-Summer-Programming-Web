import { Layout, PageHeader } from "antd";
import { useHistory } from "react-router-dom";

import "./WebContent.css"

const { Footer, Content } = Layout

function WebContent(props) {
  const history = useHistory()

  return <Layout>
    <Content className="content-container" >

      <div style={{ height: "60px" }} />
      <div className="inseted-content" >
        {props.children}
      </div>
      {props.avatar && <PageHeader
        onBack={() => {
          if (props.toRoot) {
            history.replace("/")
          } else {
            history.goBack()
          }
        }}
        title={props.title}
        subTitle={props.subTitle}
        className="header"
        avatar={{src: props.avatar}}
      />}
      {!props.avatar && <PageHeader
        onBack={() => {
          if (props.toRoot) {
            history.replace("/")
          } else {
            history.goBack()
          }
        }}
        title={props.title}
        subTitle={props.subTitle}
        className="header"
      />}
    </Content>
    <Footer className="footer">©2021 Liang Yesheng</Footer>
  </Layout>
}

export default WebContent