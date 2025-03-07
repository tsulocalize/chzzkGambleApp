import React, { useState } from "react";

function VideoGuide() {
  const codeSnippet = `body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }
iframe[src*="www.youtube-nocookie.com"] {
position: relative;
width: 1600px !important;
height: 900px !important;
top: 700px;
}
iframe[title*="CHZZK Player"] {
position: relative;width: 1600px !important;
height: 2300px !important;
clip-path: inset(650px 0px 650px 0px);
z-index: 1;
}
[class^="live_alarm_alarm"] {
position: relative;top: -690px;
}
[class^="live_alarm_animation"] {
position: relative;
top: 625px;
}
[class^="live_alarm_contents"] {
position: absolute;
top: 1690px !important;
width: 1600px !important;
z-index: 999;
transform: scale(1.5);
font-size: 32px !important;
}
[class*="live_alarm_play_video"] {font-size: 24px !important;margin-botton:20px;}
[class^="live_alarm_video_title"] {margin-top: 20px !important;}`;

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 후 상태 초기화
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">OBS 영상 도네이션 설정 가이드</h1>
        <p className="text-gray-700 mb-4">
          <br/>
          테스트 버전: OBS 30.1.2
          <br/><br/>
          설정 시, 다음과 같이 변경됩니다.<br/>
          - 영상 도네이션 화질 개선<br/>
          - 치지직 클립 영상 부분만 잘라서 확대 처리<br/><br/>

          1. OBS 실행<br/>
          2. 영상 도네이션 [브라우저 캡처]에 우클릭하여 [속성] 선택 <br/>
          3. 너비: 1600 / 높이: 1200 설정 <br/>
          4. [사용자 지정 CSS]에 아래 내용 붙여넣기
        </p>
        <div className="relative bg-gray-900 text-white font-mono p-4 rounded-md">
          <pre className="overflow-auto">{codeSnippet}</pre>
          <button
            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-sm px-2 py-1 rounded"
            onClick={copyToClipboard}
          >
            {copied ? "복사됨!" : "복사"}
          </button>
        </div>
        <p className="text-gray-700 mb-4">
          <br/>
          오류나 이상한 점이 있으면 디스코드로 알려주세요.<br/>
        </p>
      </div>
    </div>
      <a
        className="discord fixed top-0.5 right-4 block h-14 w-28 sm:hidden"
        href="https://discord.gg/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="h-14 w-28"
          src={"/small_logo_blurple_RGB.svg"}
          alt="Discord Logo"
        />
      </a>
    </div>
  )
    ;
}

export default VideoGuide;
