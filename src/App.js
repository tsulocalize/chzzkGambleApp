import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Video from "./Video";
import Landing from "./Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/video" element={<Video />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App