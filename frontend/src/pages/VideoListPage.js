import { getVideos } from "../API";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Pagination, Layout } from "antd";

import WebContent from "../components/WebContent";
import VideoListContent from "../components/VideoListContent";
import "./VideoListPage.css"

const { Footer } = Layout;

function VideoListPage(props) {
  const { page: init_page } = useParams()

  const history = useHistory()
  const [videos, setVideos] = useState([])
  const [size, setSize] = useState(40)
  const [page, setPage] = useState(init_page)
  const cols = 4

  const totalRecords = props.videoNum

  useEffect(() => {
    getVideos(init_page, size, videos => {
      setVideos(videos)
      setPage(page)
      window.scrollTo({ top: 0 })
    })
  }, [init_page, size])

  return <WebContent title="所有视频" subTitle={"第 " + init_page.toString() + " 页"} toRoot={true}>
    {videos.length > 0 && <VideoListContent videos={videos}/>}
    {videos.length === 0 && <div style={{ minHeight: "1000px" }} />}

    <Footer align="center">
      <Pagination
        showSizeChanger
        showQuickJumper
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