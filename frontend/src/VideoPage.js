import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getVideo } from "./API";
import UserCard from "./UserCard";
import { Card, Space, Statistic, Row, Col, Comment, Avatar, Divider } from "antd";
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
      subTitle={video ? video.time : id}
    >
      <Row gutter={24} style={{
        width: "100%", marginTop: "20px", marginRight: "20px", marginLeft: "20px"
      }}>

        <Col span={18}>
          <Space direction="vertical" size={24} style={{ width: "100%" }}>

            <iframe
              className="video-player fade-slide-animated"
              border="0"
              frameBorder="no"
              allowFullScreen={true}
              src={"https://player.bilibili.com/player.html?bvid=" + id}
              style={{ width: "100%", aspectRatio: "1.7", backgroundColor: "#fff" }}
            />

            <Card
              className="fade-slide-animated"
              title="评论"
              style={{ animationDelay: "0.2s" }}
              loading={video == null}
            >
              {video && CommentView()}
            </Card>
          </Space>

        </Col>
        
        <Col span={6} >
          <UserCard
            id={video ? video.author_id : null}
            className="fade-slide-animated"
            title="UP 主"
            style={{ animationDelay: "0.05s" }}
            link
            showBio
          />
          <div style={{ height: 24 }} />
          <Card
            className="fade-slide-animated"
            title="视频信息"
            loading={video == null}
            style={{ animationDelay: "0.1s" }}
          >
            {video && <Space direction="vertical" size={18} style={{ width: "100%" }} >
              {StatisticRow("播放量", video.plays,
                <PlaySquareTwoTone />, 4)}
              {StatisticRow("点赞数", video.stars,
                <LikeTwoTone />, 5)}
              {StatisticRow("弹幕数", video.shoots,
                <BuildTwoTone />, 6)}
              {StatisticRow("投币数", video.coins,
                <DollarCircleTwoTone />, 7)}
              {video.description.length > 4 &&
                <div
                  className="fade-slide-animated"
                  style={{ marginTop: "15px", animationDelay: "0.6s" }}
                >
                  <strong>简介</strong>
                  <div style={{ color: "gray" }}>{video.description}</div>
                </div>}

            </Space>
            }
          </Card>
        </Col>
      </Row>
    </WebContent>
  </>

  function StatisticRow(title, value, prefix, index) {
    return <Statistic
      className="fade-slide-animated"
      title={title}
      value={value}
      prefix={prefix}
      style={{ animationDelay: (0.06 * index).toString() + "s" }}
    />
  }

  function CommentView() {
    const names = ["Ailce", "Bob", "Carol", "Dave", "Eve"]
    const colors = ["#fa541c", "#fa8c16", "#faad14", "#fadb14",
      "#a0d911", "#52c41a", "#13c2c2", "#1890ff", "#2f54eb", "#722ed1"]
    shuffleArray(colors)
    return video.comments.map((comment, index) =>
      <Comment
        key={index}
        className="fade-slide-animated"
        author={names[index % 5]}
        avatar={<Avatar style={{ backgroundColor: colors[index % 5] }} />}
        content={comment}
        style={{ animationDelay: (index * 0.1).toString() + "s" }}
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