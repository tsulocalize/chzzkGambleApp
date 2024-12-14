import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./Main";
import Video from "./Video";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<Main />} />*/}
        <Route path="/video" element={<Video />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App