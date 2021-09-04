import { getUser } from "../API";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, Col, Row, Space } from "antd";

import "./UserCard.css"


function UserCard(props) {
  const [user, setUser] = useState(props.user)
  const id = props.id
  const title = props.title
  const showBio = props.showBio
  const showStats = props.showStats
  const hoverable = props.hoverable ? props.hoverable : false

  useEffect(() => {
    if (id && !user) {
      getUser(id, (user) => {
        setUser(user)
      })
    }
  })

  return <Card
    title={title}
    loading={user == null}
    className={props.className}
    style={props.style}
    hoverable={hoverable}
  >
    {user && <Space direction="vertical" size={8}>

      <Row gutter={16} align="middle" wrap={false}>
        <Col flex="none" >
          <Avatar src={user.avatar_url + "@90w_90h_1c_100q.webp"} />
        </Col>
        <Col className="user-name" flex="auto">
          <Name />
        </Col>
      </Row>
      {user.bio.length > 0 && showBio &&
        <div
          style={{ marginTop: "15px" }}
        >
          <strong>简介</strong>
          <div style={{ color: "gray" }}>{user.bio}</div>
        </div>}

    </Space>
    }

  </Card>

  function Name() {
    if (props.link) {
      return <Link to={"/user/" + user.id} className="user-name">
        <strong className="user-link">{user.name}</strong>
      </Link>
    } else {
      return <strong className="user-name">{user.name}</strong>
    }
  }
}

export default UserCard