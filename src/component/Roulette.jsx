import React, { useRef, useState, useEffect, useCallback } from "react";
import pinImg from "../assets/Pin.svg";
import styles from "./Roulette.module.css";

import triggerConfetti from "../util/triggerConfetti";
import { OPTIONS_COLORS } from "../constants/OptionColors";
import SpinningButton from "./SpinningButton";

const Roulette = ({ options, setSelected, setTrigger }) => {
  const canvasRef = useRef(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [stopRequested, setStopRequested] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // 각 옵션의 비율을 기반으로 각도 계산
  const calculateAngles = () => {
    const total = options.reduce((sum, option) => sum + option.vote, 0);
    return options.map(option => (option.vote / total) * 360);
  };

  const angles = calculateAngles();

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
    let startAngle = -Math.PI / 2; // 시작 각도 (12시 방향)

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas 초기화

    ctx.save();
    ctx.translate(cw, ch); // 중앙으로 이동

    for (let i = 0; i < options.length; i++) {
      const endAngle = startAngle - (angles[i] * Math.PI) / 180;
      ctx.beginPath();
      ctx.fillStyle = OPTIONS_COLORS[i % OPTIONS_COLORS.length]; // 섹션 색상 설정
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, cw, endAngle, startAngle); // 섹션의 호를 그림
      ctx.fill();
      ctx.closePath();

      // 섹션의 중앙 각도 계산
      const angle = endAngle + (angles[i] * Math.PI) / 360 + 0.08;
      ctx.save();
      ctx.translate(Math.cos(angle) * (cw - 150), Math.sin(angle) * (cw - 150)); // 텍스트 위치 계산
      ctx.rotate(angle); // 텍스트 회전
      ctx.fillStyle = "#fff"; // 텍스트 색상 설정
      ctx.font = "bold 1.4rem Pretendard"; // 텍스트 폰트 설정
      ctx.textAlign = "left"; // 텍스트 정렬
      ctx.fillText(options[i].name, 0, 0); // 옵션 텍스트 출력
      ctx.restore();

      startAngle = endAngle; // 다음 섹션의 시작 각도 업데이트
    }

    ctx.restore(); // 초기 회전 상태 복원
  };

  const findSelectedOption = useCallback(() => {
    const totalAngles = angles.reduce((sum, angle) => sum + angle, 0);
    let normalizedAngle = ((angle % totalAngles) + totalAngles) % totalAngles; // 각도를 0~totalAngles로 정규화
    let cumulativeAngle = 0;

    for (let i = 0; i < angles.length; i++) {
      cumulativeAngle += angles[i];
      if (normalizedAngle < cumulativeAngle) {
        setSelectedOption(options[i].name); // 선택된 옵션 설정
        break;
      }
    }
  }, [angle, options, angles]);

  const spin = () => {
    setAngle((prevAngle) => (prevAngle + speed) % 360); // 각도를 증가시켜 룰렛 회전

    findSelectedOption();

    if (stopRequested) {
      setSpeed((prevSpeed) => {
        const newSpeed = prevSpeed * 0.996; // 서서히 속도 감소
        if (newSpeed < 0.01) {
          setIsSpinning(false); // 회전 중지
          setStopRequested(false); // 멈추기 요청 리셋
          triggerConfetti();
          setSelected(selectedOption);
          setTrigger(true);
          setTimeout(() => {
            setTrigger(false);
          }, 7000);
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
      <div className={styles.canvasContainer}>
        <canvas
          className={styles.wheel}
          ref={canvasRef}
          width={500}
          height={500}
        ></canvas>
        <img className={styles.pin} src={pinImg} alt="pin" />
      </div>
      <div className={styles.buttonContainer}>
        <SpinningButton label1={"돌리기"} label2={"멈춤"}
                        onClick1={handleRotate} onClick2={handleStop} isType1={!isSpinning}/>
      </div>
    </div>
  );
};

export default Roulette;
