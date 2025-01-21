import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Video from "./Video";
import Landing from "./Landing";
import RankingPage from "./RankingPage";
import RoulettePage from "./RoulettePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/roulette" element={<RoulettePage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/video" element={<Video />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App