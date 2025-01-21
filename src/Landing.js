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
    '먼저 채널명으로 연결합니다.\n' +
    '그리고 투표 상태를 "ON" 설정하면 ' +
    '<내용> 형태로 온 도네이션을 집계합니다.\n'

  const videoContent = '영상 도네이션 목록입니다.\n\n' +
    '채널명을 입력하면 ' +
    '그 순간부터 영상 도네이션을 기록합니다.\n' +
    '누군가 먼저 기록 중이었다면 해당 목록을 보여줍니다.\n'

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
      <div className="content-container-landing">
        <div className="menu">
          <ContentBox title="도네이션 룰렛" content={formatContent(rouletteContent)} tag="스트리머용" tagColor="#FDEB71"/>
          <GotoButton name="바로가기" onClick={() => handleRedirect('/roulette')}/>
        </div>
        <div className="menu">
          <ContentBox title="영상 도네이션 목록" content={formatContent(videoContent)} tag="시청자용" tagColor="#ABDCFF"/>
          <GotoButton name="바로가기" onClick={() => handleRedirect('/video')}/>
        </div>
      </div>
    </div>

  )
}


export default Landing;