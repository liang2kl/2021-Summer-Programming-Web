import { getVideos } from "./API";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Space, Image, Pagination, Layout } from "antd";

import WebContent from "./WebContent";
import "./VideoListPage.css"

const { Footer } = Layout;

function VideoListPage(props) {

  const [videos, setVideos] = useState([])
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(40)
  const cols = 4
  const rows = parseInt(videos.length / cols) + ((videos.length % cols) != 0 ? 1 : 0)

  const totalRecords = props.videos

  useEffect(() => {
    getVideos(page, size, videos => {
      setVideos(videos)
      window.scrollTo({ top: 0 })
    })
  }, [])

  return <WebContent title="所有视频" subTitle={"第 " + page.toString() + " 页"}>
      {videos.length > 0 && listContent()}
      {videos.length === 0 && <div style={{minHeight: "1000px"}} />}

      <Footer align="center">
        <Pagination
          showSizeChanger
          onChange={(page, size) => {
            setPage(page)
            setSize(size)
            getVideos(page, size, videos => {
              setVideos(videos)
              window.scrollTo({ top: 0 })
            })
          }}
          defaultCurrent={page}
          total={totalRecords}
          pageSize={size}
          pageSizeOptions={[20, 40, 60, 100]}
        />
      </Footer>

  </WebContent>
  

  function listContent() {
    return <div className="video-list-container">
      <Space direction="vertical" size={16}>
        {Array(rows).fill(null).map((_, row) =>
          <Row key={row.toString()} align="middle" gutter={[16, 16]}>
            {Array(row == rows - 1 ? videos.length % cols : cols)
              .fill(null).map((_, col) =>
                <Col key={videos[row * cols + col].id} span={parseInt(24 / cols)}>
                  <Link to={"/video/" + videos[row * cols + col].id}>
                    <Card hoverable={true} className="c" style={{ animationDelay: ((row * cols + col) * 0.03).toString() + "s" }}>
                      <h3 className="card-header card-text">{videos[row * cols + col].title}</h3>
                      <div className="card-description card-text">{videos[row * cols + col].description}</div>
                      <Image
                        src={videos[row * cols + col].cover_url + "@412w_232h_1c.jpg"}
                        preview={false}
                        style={{
                          marginTop: "16px",
                          borderRadius: "3px"
                        }}
                      />
                    </Card>
                  </Link>
                </Col>
              )}
          </Row>
        )}
      </Space>
    </div>
  }
}

export default VideoListPage