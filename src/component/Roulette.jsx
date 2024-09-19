import React, { useRef, useState, useEffect, useCallback } from "react";
import pinImg from "../assets/Pin.svg";
import styles from "./Roulette.module.css";
import Button from "./Button";

import triggerConfetti from "../util/triggerConfetti";
import { OPTIONS_COLORS } from "../constants/OptionColors";

const Roulette = ({ options, handleGetOptions }) => {
  const canvasRef = useRef(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [stopRequested, setStopRequested] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    drawWheel();
  }, [options]);

  useEffect(() => {
    if (isSpinning) {
      const canvas = canvasRef.current;
      canvas.style.transform = `rotate(${angle}deg)`; // 각도에 따라 룰렛 회전
      const animationFrame = requestAnimationFrame(spin); // 다음 프레임에서 spin 함수 호출
      return () => cancelAnimationFrame(animationFrame); // 이전 애니메이션 프레임 취소
    }
  }, [isSpinning, angle, speed]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const [cw, ch] = [canvas.width / 2, canvas.height / 2];
    const arc = Math.PI / (options.length / 2); // 각 섹션의 각도 계산

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas 초기화

    // 첫 섹션이 중앙 위로 오도록 보정
    ctx.save();
    ctx.translate(cw, ch);
    ctx.rotate(-Math.PI / 2 - arc / 2); // 첫 섹션을 중앙 위에 맞추기 위해 회전 보정
    ctx.translate(-cw, -ch);

    for (let i = 0; i < options.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = OPTIONS_COLORS[i % OPTIONS_COLORS.length]; // 섹션 색상 설정
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, cw, arc * (i - 1), arc * i); // 섹션의 호를 그림
      ctx.fill();
      ctx.closePath();
    }

    ctx.fillStyle = "#fff"; // 텍스트 색상 설정
    ctx.font = "bold 1.4rem Pretendard"; // 텍스트 폰트 설정
    ctx.textAlign = "center"; // 텍스트 정렬

    for (let i = 0; i < options.length; i++) {
      const angle = arc * i + arc / 2; // 섹션의 중앙 각도 계산

      ctx.save();

      ctx.translate(
        cw + Math.cos(angle) * (cw - 50),
        ch + Math.sin(angle) * (ch - 50)
      ); // 텍스트 위치 계산

      ctx.rotate(angle + Math.PI / 2); // 텍스트 회전

      options[i].split(" ").forEach((text, j) => {
        ctx.fillText(text, 0, 30 * j);
      });

      ctx.restore();
    }

    ctx.restore(); // 초기 회전 상태 복원
  };

  const findSelectedOption = useCallback(() => {
    const segmentAngle = 360 / options.length; // 각 섹션의 각도 계산
    let normalizedAngle = ((angle % 360) + 360) % 360; // 각도를 0~360도로 정규화
    const selectedArcIndex = Math.floor(
      ((360 - normalizedAngle + segmentAngle / 2) % 360) / segmentAngle
    );

    setSelectedOption(options[selectedArcIndex]); // 회전 중 선택된 옵션 업데이트
  }, [angle, options]);

  const spin = () => {
    setAngle((prevAngle) => (prevAngle + speed) % 360); // 각도를 증가시켜 룰렛 회전

    findSelectedOption();

    if (stopRequested) {
      setSpeed((prevSpeed) => {
        const newSpeed = prevSpeed * 0.98; // 서서히 속도 감소
        if (newSpeed < 0.5) {
          setIsSpinning(false); // 회전 중지
          setStopRequested(false); // 멈추기 요청 리셋
          return 0;
        }
        return newSpeed; // 감소된 속도 반환
      });
    }
  };

  const handleRotate = () => {
    reset();
    setIsSpinning(true); // 회전 상태로 설정
    setSelectedOption(null); // 회전 시작 시 선택된 옵션 초기화
  };

  const handleStop = () => {
    setStopRequested(true); // 멈추기 요청

    setTimeout(() => {
      triggerConfetti();
    }, 3000);
  };

  const reset = () => {
    const canvas = canvasRef.current;
    canvas.style.transform = "rotate(0deg)";
    setAngle(0); // 각도 상태 초기화
    setSpeed(20); // 회전 속도를 설정
  };

  return (
    <div className={styles.wheelContainer}>
      <div className={styles.selectedOption}>{selectedOption}</div>
      {/* 선택된 옵션을 표시 */}
      <div className={styles.canvasContainer}>
        <canvas
          className={styles.wheel}
          ref={canvasRef}
          width={500}
          height={500}
        ></canvas>
        {/* 룰렛을 그릴 Canvas */}
        <img className={styles.pin} src={pinImg} alt="pin" />
        {/* 고정 핀 이미지 */}
      </div>
      <div className={styles.buttonContainer}>
        <Button
          label={"게임 시작"}
          onClick={handleGetOptions}
          disabled={!isSpinning}
        />
        <Button label={"돌리기"} onClick={handleRotate} disabled={isSpinning} />
        <Button label={"멈춤"} onClick={handleStop} disabled={!isSpinning} />
        {/* 회전 멈춤 버튼 */}
      </div>
    </div>
  );
};

export default Roulette;
