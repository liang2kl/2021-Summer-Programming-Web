import { Col, Row, Space } from "antd";
import "./GridContent.css"

function GridContent(props) {
  const total = props.total
  const cols = props.cols
  const rows = parseInt(total / cols) + ((total % cols) != 0 ? 1 : 0)
  const content = props.content
  const itemId = props.itemId

  return <Space direction="vertical" size={16} className="grid-container" style={{ width: "100%" }}>
      {Array(rows).fill(null).map((_, row) =>
        <Row key={row.toString()} align="middle" gutter={[16, 16]} style={{flexDirection: "row"}}>
          {Array(row == rows - 1 ? (row === 0 ? total : (total % cols)) : cols)
            .fill(null).map((_, col) =>
              <Col key={itemId(row * cols + col)} span={parseInt(24 / cols)}>
                {content(row * cols + col)}
              </Col>
            )}
        </Row>
      )}
    </Space>

}

export default GridContent