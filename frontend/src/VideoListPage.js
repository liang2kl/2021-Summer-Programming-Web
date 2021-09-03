import { getVideos } from "./API";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Card, Image, Pagination, Layout, Tooltip } from "antd";

import WebContent from "./WebContent";
import GridContent from "./GridContent";
import "./VideoListPage.css"

const { Footer } = Layout;

function VideoListPage(props) {
  const { page: init_page } = useParams()
  
  const history = useHistory()
  const [videos, setVideos] = useState([])
  const [size, setSize] = useState(40)
  const [page, setPage] = useState(init_page)
  const cols = 4

  const totalRecords = props.videos

  useEffect(() => {
    getVideos(init_page, size, videos => {
      setVideos(videos)
      setPage(page)
      window.scrollTo({ top: 0 })
    })
  }, [init_page, size])

  return <WebContent title="所有视频" subTitle={"第 " + init_page.toString() + " 页"} toRoot={true}>
    {videos.length > 0 &&
      <GridContent
        total={videos.length}
        cols={cols}
      content={(index) => <Link to={"/video/" + videos[index].id}>
        <Card hoverable={true} className="c"
          style={{ animationDelay: ((index) * 0.03).toString() + "s" }}>
          <Tooltip title={videos[index].title}>
            <h3 className="card-header card-text">{videos[index].title}</h3>
            <div className="card-description card-text">{videos[index].description}</div>
          </Tooltip>
          <Image
            src={videos[index].cover_url + "@412w_232h_1c.jpg"}
              preview={false}
              style={{
                marginTop: "16px",
                borderRadius: "3px"
              }}
            />
          </Card>
        </Link>}
        itemId={(index) => videos[index].id}
      />}
    {videos.length === 0 && <div style={{ minHeight: "1000px" }} />}

    <Footer align="center">
      <Pagination
        showSizeChanger
        onChange={(page, size) => {
          setPage(page)
          setSize(size)
          history.push("/videos/" + page.toString())
        }}
        defaultCurrent={init_page}
        total={totalRecords}
        pageSize={size}
        pageSizeOptions={[20, 40, 60, 100]}
      />
    </Footer>

  </WebContent>
}

export default VideoListPage