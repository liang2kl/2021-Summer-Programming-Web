import axios from "axios"

function get(path, parameters, handler) {
    axios.get(path, { params: parameters })
        .then((response) => {
            if (response.data.code >= 0) {
                // TODO: Handler error
                handler(response.data.data)
            } else {
                console.log(response)
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

function getVideoCount(handler) {
    get("/stats?type=v", null, handler)
}

function getUserCount(handler) {
    get("/stats?type=u", null, handler)
}

function getVideos(page, count, handler) {
    get("/list", {"page": page, "count": count, "type": "v"}, handler)
}

function getUsers(page, count, handler) {
    get("/list", { "page": page, "count": count, "type": "u" }, handler)
}

export { getVideoCount, getUserCount, getVideos, getUsers }