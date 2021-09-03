import axios from "axios"

function get(path, parameters, handler) {
    axios.get(path, { params: parameters })
        .then((response) => {
            if (response.data.code >= 0) {
                // TODO: Handler error
                handler(response.data)
            } else {
                console.log(response)
            }
        })
        .catch((error) => {
            // TODO: Handler error
            console.log(error)
        })
}

function getVideoCount(handler) {
    get("/stats?type=v", null, (data) => handler(data.data))
}

function getUserCount(handler) {
    get("/stats?type=u", null, (data) => handler(data.data))
}

function getVideos(page, count, handler) {
    get("/list", { "page": page, "count": count, "type": "v" }, (data) => handler(data.data))
}

function getUsers(page, count, handler) {
    get("/list", { "page": page, "count": count, "type": "u" }, (data) => handler(data.data))
}

function getVideo(id, handler) {
    get("/video", { "id": id }, (data) => handler(data.data))
}

function getUser(id, handler) {
    get("/user", { "id": id }, (data) => handler(data.data))
}

function getUserVideos(id, handler) {
    get("/list", { type: "uv", id: id }, (data) => handler(data.data))
}

function searchVideos(keyword, handler) {
    get("/search", { type: "v", q: keyword }, handler)
}

function searchUsers(keyword, handler) {
    get("/search", { type: "u", q: keyword }, handler)
}

export {
    getVideoCount, getUserCount,
    getVideos, getUsers, getVideo,
    getUser, getUserVideos,
    searchVideos, searchUsers
}