import { Card, Image, Tooltip } from "antd";
import { Link } from "react-router-dom";
import GridContent from "./GridContent";


function VideoListContent(props) {
  const videos = props.videos ? props.videos : []
  const cols = props.cols ? props.cols : 4
  const delay = props.delay ? props.delay : 0

  return <GridContent
    total={videos.length}
    cols={cols}
    content={(index) => <Link to={"/video/" + videos[index].id}>
      <Card hoverable={true} className="c"
        style={{ animationDelay: (index * 0.03 + delay).toString() + "s" }}>
        <Tooltip title={videos[index].title}>
          <h3 className="card-header card-text">{videos[index].title}</h3>
        </Tooltip>
        <div className="card-description card-text">{videos[index].description}</div>
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
  />
}

export default VideoListContent