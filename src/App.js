import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Video from "./Video";
import Landing from "./Landing";
import RankingPage from "./RankingPage";
import RoulettePage from "./RoulettePage";
import VideoGuide from "./VideoGuide";
import MaintenancePage from "./MaintenancePage";

function App() {
  return (
    <BrowserRouter>
      {/*<Routes>*/}
      {/*  <Route path="/" element={<Landing />} />*/}
      {/*  <Route path="/roulette" element={<RoulettePage />} />*/}
      {/*  <Route path="/ranking" element={<RankingPage />} />*/}
      {/*  <Route path="/video" element={<Video />} />*/}
      {/*  <Route path="/video-guide" element={<VideoGuide />} />*/}
      {/*</Routes>*/}
      <Routes>
        <Route path="/" element={<MaintenancePage />} />
        <Route path="/roulette" element={<MaintenancePage />} />
        <Route path="/ranking" element={<MaintenancePage />} />
        <Route path="/video" element={<MaintenancePage />} />
        <Route path="/video-guide" element={<MaintenancePage />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App