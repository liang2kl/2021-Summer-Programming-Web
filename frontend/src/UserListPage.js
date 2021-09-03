import { Link, useParams, useHistory } from "react-router-dom";
import { getUsers } from "./API";
import { useEffect, useState } from "react";
import { Pagination, Layout } from "antd";

import WebContent from "./WebContent";
import GridContent from "./GridContent";
import UserCard from "./UserCard";

const { Footer } = Layout;


function UserListPage(props) {
  const { page: init_page } = useParams()
  const history = useHistory()
  const [users, setUsers] = useState([])
  const [size, setSize] = useState(40)
  const [page, setPage] = useState(init_page)
  const cols = 4

  const totalRecords = props.userNum

  useEffect(() => {
    getUsers(init_page, size, users => {
      setUsers(users)
      setPage(page)
      window.scrollTo({ top: 0 })
    })
  }, [init_page, size])


  return <WebContent title="所有用户" subTitle={"第 " + init_page.toString() + " 页"} toRoot={true}>
    {users.length > 0 &&
      <GridContent
        total={users.length}
        cols={cols}
        content={(index) => <Link to={"/user/" + users[index].id}>
          <UserCard user={users[index]} className="c" style={{ animationDelay: ((index) * 0.03).toString() + "s" }} hoverable/>
        </Link>}
        itemId={(index) => users[index].id}        
      />
    }
    {users.length === 0 && <div style={{ minHeight: "1000px" }} />}

    <Footer align="center">
      <Pagination
        showSizeChanger
        onChange={(page, size) => {
          setPage(page)
          setSize(size)
          history.push("/users/" + page.toString())
        }}
        defaultCurrent={init_page}
        total={totalRecords}
        pageSize={size}
        pageSizeOptions={[20, 40, 60, 100]}
      />
    </Footer>

  </WebContent>
}

export default UserListPage