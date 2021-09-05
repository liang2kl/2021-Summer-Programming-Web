import { Input, Radio, Space } from 'antd'
import { searchUsers, searchVideos } from '../API'
import WebContent from "../components/WebContent"
import VideoListContent from '../components/VideoListContent'
import UserListContent from '../components/UserListContent'
import { PagedContent } from '../components/PagedContent'
import { useState } from 'react'

import "./SearchPage.css"

const { Search } = Input

function SearchPage() {

  const [type, setType] = useState("v")
  const [videos, setVideos] = useState([])
  const [users, setUsers] = useState([])
  const [videoKey, setVideoKey] = useState("")
  const [userKey, setUserKey] = useState("")
  const [interval, setInterval] = useState()
  const [keyChanged, setKeyChanged] = useState(true)

  return <WebContent title="搜索" subTitle={interval ? (interval * 1000).toString() + "ms" : ""}>
    <Space direction="vertical" size={24} style={{ width: "100%", marginLeft: "24px", marginRight: "24px" }}>
      <Search placeholder={"搜索" + (type == "v" ? "视频" : "用户")} className="fade-slide-animated"
        size="large" onChange={() => setKeyChanged(true)} onSearch={(string) => {
          if (!string && keyChanged) { return }
          if (type == "v" && videoKey !== string) {
            setVideoKey(string)
            setKeyChanged(false)
            setInterval(null)
            searchVideos(string, (data) => {
              setVideos(data.data)
              setInterval(data.interval.toString())
            })
          } else if (userKey !== string) {
            setUserKey(string)
            setKeyChanged(false)
            setInterval(null)
            searchUsers(string, (data) => {
              setUsers(data.data)
              setInterval(data.interval)
            })
          }
        }} />
      <Radio.Group className="fade-slide-animated" style={{ animationDelay: "0.1s" }}
        defaultValue={type} buttonStyle="solid" onChange={(e) => setType(e.target.value)}>
        <Radio.Button value="v">视频</Radio.Button>
        <Radio.Button value="u">用户</Radio.Button>
      </Radio.Group>

      <h2 className="fade-slide-animated">{type == "v" ? videoKey : userKey}</h2>
      {type == "v" && videos.length > 0 &&
        <PagedContent data={videos} content={(videos) => <VideoListContent videos={videos} />} />
      }
      {type == "u" && users.length > 0 &&
        <PagedContent data={users} content={(users) => <UserListContent users={users} />} />
      }
      {((type == "v" && videos.length == 0) || (type == "u" && users.length == 0)) &&
        <div className="fade-slide-animated" style={{ height: "800px", animationDelay: "0.1s"}}>输入搜索内容</div>
      }

    </Space>
  </WebContent>
}

export default SearchPage