import IndexPage from './pages/IndexPage';
import VideoListPage from './pages/VideoListPage';
import UserListPage from './pages/UserListPage';
import VideoPage from './pages/VideoPage';
import UserPage from './pages/UserPage';
import SearchPage from './pages/SearchPage';
import axios from "axios"
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getVideoCount, getUserCount } from "./API"

function App() {
  // Setup request base url
  axios.defaults.baseURL = "http://localhost:8000"

  const [videoCount, setVideoCount] = useState(null)
  const [userCount, setUserCount] = useState(null)

  useEffect(() => {
    getVideoCount(count => setVideoCount(count))
    getUserCount(count => setUserCount(count))
  }, [])

  return (
    <HashRouter basename={"/"}>
      <Switch>
        <Route path="/" exact render={() => <IndexPage userNum={userCount} videoNum={videoCount}/>} />
        <Route path="/videos/:page" component={() => <VideoListPage videoNum={videoCount}/>} />
        <Route path="/users/:page" component={() => <UserListPage userNum={userCount} />} />
        <Route path="/video/:id" component={() => <VideoPage />} />
        <Route path="/user/:id" component={() => <UserPage />} />
        <Route path="/videos" component={() => <Redirect to="/videos/1"/>}/>
        <Route path="/users" component={() => <Redirect to="/users/1" />} />
        <Route path="/search" component={() => <SearchPage />} />
      </Switch>
    </HashRouter>

  )
    
}

export default App;
