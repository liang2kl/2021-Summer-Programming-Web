import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getUser, getUserVideos } from "../API";
import VideoListContent from "../components/VideoListContent";
import WebContent from "../components/WebContent";
import { Card, Space, Statistic, Row, Col } from "antd";
import { FireTwoTone, StarTwoTone } from "@ant-design/icons";

import "./UserPage.css"

function UserPage() {
  const { id } = useParams()

  const [videos, setVideos] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser(id, (user) => {
      setUser(user)
    })
    getUserVideos(id, (videos) => {
      setVideos(videos)
      console.log(videos)
    })
  }, [id])

  return <WebContent title={user ? user.name : "加载中"} avatar={user ? user.avatar_url + "@90w_90h_1c_100q.webp" : null}>
    <Row gutter={48}>
      <Col span={18}>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <h2 className="fade-animated section-header" style={{ animationDelay: "0.5s", marginTop: "10px" }}>视频</h2>
          {videos && <VideoListContent videos={videos} delay={0.3} cols={3} />}
        </Space>
      </Col>

      <Col span={6}>
        <Card
          className="fade-slide-animated"
          title="关于 UP 主"
          loading={user == null}
          style={{ animationDelay: "0.5s" }}
        >
          {user && <Space direction="vertical" size={18} style={{ width: "100%" }} >
            {StatisticRow("粉丝数", user.fan_num,
              <FireTwoTone />, 4)}
            {StatisticRow("关注数", user.subs_num,
              <StarTwoTone />, 5)}
            {user.bio.length > 4 &&
              <div
                className="fade-slide-animated"
                style={{ marginTop: "15px", animationDelay: "0.6s" }}
              >
                <strong>简介</strong>
              <div style={{ color: "gray" }}>{user.bio}</div>
              </div>}
          </Space>}
        </Card>
      </Col>
    </Row>
  </WebContent>

  function StatisticRow(title, value, prefix, index) {
    return <Statistic
      className="fade-slide-animated"
      title={title}
      value={value}
      prefix={prefix}
      style={{ animationDelay: (0.06 * index).toString() + "s" }}
    />
  }

}

export default UserPage