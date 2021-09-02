import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getVideo } from "./API";
import { Card, Space, Statistic, Row, Col, Comment, Avatar } from "antd";
import { PlaySquareTwoTone, BuildTwoTone, LikeTwoTone, DollarCircleTwoTone } from "@ant-design/icons";

import WebContent from "./WebContent";

import "./VideoPage.css"

function VideoPage() {
  const { id } = useParams()

  const [video, setVideo] = useState(null)

  useEffect(() => {
    getVideo(id, (video) => {
      setVideo(video)
      window.scrollTo(0, 0)
    })
  }, [])

  return <>
    <WebContent
      title={video ? video.title : "加载中"}
      subTitle={id}
    >
      <Space direction="vertical" size={24} style={{ 
        width: "100%", marginTop: "20px", marginRight: "20px", marginLeft: "20px" }}>
        <Row gutter={24}>
          <Col span={18}>
            <iframe
              className="video-player fade-slide-animated"
              border="0"
              frameborder="no"
              framespacing="0"
              allowfullscreen="true"
              src={"https://player.bilibili.com/player.html?bvid=" + id}
              style={{ width: "100%", aspectRatio: "1.7", backgroundColor: "#fff" }}
            />
          </Col>
          <Col span={6} >
            <Card
              className="fade-slide-animated"
              title="视频信息"
              loading={video == null}
              style={{ animationDelay: "0.1s" }}
            >
              {video && <Space direction="vertical" size={16}>
                {StatisticRow("播放量", video.plays,
                  <PlaySquareTwoTone />, 2)}
                {StatisticRow("点赞数", video.stars,
                  <LikeTwoTone />, 3)}
                {StatisticRow("弹幕数", video.shoots,
                  <BuildTwoTone />, 4)}
                {StatisticRow("投币数", video.coins,
                  <DollarCircleTwoTone />, 4)}
              </Space>
              }
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={18}>
            <Card
              className="fade-slide-animated"
              title="评论"
              style={{ animationDelay: "0.2s" }}
              loading={video == null}
            >
              {video && CommentView()}
            </Card>
          </Col>
        </Row>
      </Space>
    </WebContent>
  </>

  function StatisticRow(title, value, prefix, index) {
    return <Statistic
      className="fade-slide-animated"
      title={title}
      value={value}
      prefix={prefix}
      style={{ animationDelay: (0.1 * index).toString() + "s" }}
    />
  }

  function CommentView() {
    const names = ["Ailce", "Bob", "Carol", "Dave", "Eve"]
    const colors = ["#fa541c", "#fa8c16", "#faad14", "#fadb14",
      "#a0d911", "#52c41a", "#13c2c2", "#1890ff", "#2f54eb", "#722ed1"]
    shuffleArray(colors)
    return video.comments.map((comment, index) =>
      <Comment
        className="fade-slide-animated"
        author={names[index % 5]}
        avatar={<Avatar style={{ backgroundColor: colors[index % 5] }} />}
        content={comment}
        style={{animationDelay: (index * 0.1).toString() + "s"}}
      />
    )
  }

}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export default VideoPage