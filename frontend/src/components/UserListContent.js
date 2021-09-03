import { Link } from "react-router-dom";
import GridContent from "./GridContent";
import UserCard from "./UserCard";


function UserListContent(props) {
    const users = props.users ? props.users : []
    const cols = props.cols ? props.cols : 4
    const delay = props.delay ? props.delay : 0

    return <GridContent
        total={users.length}
        cols={cols}
        content={(index) => <Link to={"/user/" + users[index].id}>
            <UserCard user={users[index]} className="c" style={{ animationDelay: (delay + index * 0.01).toString() + "s" }} hoverable />
        </Link>}
        itemId={(index) => users[index].id}
    />
}

export default UserListContent