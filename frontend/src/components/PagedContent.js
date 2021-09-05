import { Pagination, Layout } from "antd";
import { useState } from "react";

const Footer = Layout

export function PagedContent(props) {
  const data = props.data
  const content = props.content

  const [size, setSize] = useState(20)
  const [page, setPage] = useState(1)

  const shownData = data.slice((page - 1) * size, page * size)

  return <>
    {content(shownData)}
    <Footer align="center">
      <Pagination
        showSizeChanger
        showQuickJumper
        onChange={(page, size) => {
          setPage(page)
          setSize(size)
          window.scrollTo(0, 0)
        }}
        defaultCurrent={1}
        total={data.length}
        pageSize={size}
        pageSizeOptions={[20, 40, 60, 100]}
      />
    </Footer>

  </>
}