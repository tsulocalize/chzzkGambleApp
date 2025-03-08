import React from "react";
import {useNavigate} from "react-router-dom";
import {GotoButton} from "./component/GotoButton";
import ContentBox from "./component/ContentBox";
import "./Landing.css"

function Landing() {
  const navigate = useNavigate();

  const handleRedirect = (url) => {
    navigate(url); // Replace '/new-page' with the path you want to navigate to
  };

  const rouletteContent = '스트리머용 도네이션 룰렛입니다.\n\n' +
    '채널명으로 연결합니다.\n' +
    '투표 상태를 "ON" 설정하면 ' +
    '<내용> 형태로 온 도네이션을 집계합니다.\n'

  const videoContent = '영상 도네이션 목록입니다.\n\n' +
    '채널명을 입력하면 ' +
    '영상 도네이션을 기록합니다.\n' +
    '누군가 먼저 기록 중이라면 해당 목록을 보여줍니다.\n'

  const videoGuideContent = 'OBS 영상 도네이션 설정 가이드 입니다.\n\n' +
  '설정 시, 다음과 같이 변경됩니다.\n' +
    '- 영상 도네이션 화질 개선\n' +
    '- 치지직 클립 영상 부분만 잘라서 확대 처리';

  const formatContent = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div>
      <div className="content-container-landing w-[100%]">
        <div className="menu">
          <ContentBox title="도네이션 룰렛(PC)" content={formatContent(rouletteContent)} tag="스트리머용" tagColor="#FDEB71"/>
          <GotoButton name="바로가기" onClick={() => handleRedirect('/roulette')}/>
        </div>
        <div className="menu">
          <ContentBox title="영상 도네이션 목록" content={formatContent(videoContent)} tag="시청자용" tagColor="#ABDCFF"/>
          <GotoButton name="바로가기" onClick={() => handleRedirect('/video')}/>
        </div>
        <div className="menu">
          <ContentBox title="영도 설정 가이드" content={formatContent(videoGuideContent)} tag="스트리머용" tagColor="#FDEB71"/>
          <GotoButton name="바로가기" onClick={() => handleRedirect('/video-guide')}/>
        </div>
      </div>
    </div>

  )
}


export default Landing;