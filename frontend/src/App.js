import IndexPage from './IndexPage';
import axios from "axios"

function App() {
  // Setup request base url
  axios.defaults.baseURL = "http://localhost:8000"

  return IndexPage();
}

export default App;
