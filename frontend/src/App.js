import IndexPage from './IndexPage';
import VideoListPage from './VideoListPage';
import VideoPage from './VideoPage';
import axios from "axios"
import {BrowserRouter, Switch, Route} from 'react-router-dom'
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
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <IndexPage users={userCount} videos={videoCount}/>} />
        <Route path="/videos" component={() => <VideoListPage videos={videoCount}/>} />
        <Route path="/video/:id" component={() => <VideoPage />} />
      </Switch>
    </BrowserRouter>

  )
    
}

export default App;
