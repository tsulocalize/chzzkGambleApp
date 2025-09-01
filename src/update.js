export const FallbackPage = () => {
  return (
    <div>
      <div className="title">

      </div>
      <div className="content whitespace-pre-line">
        {`치즈온미는 업데이트 중!
        더 나은 서비스를 위해 조금만 기다려주세요\n
        업데이트 기간: 09/01 1시 ~ 미정`}
      </div>
    </div>
    // <S.Wrapper>
    //   <Title mainText={"에러가 발생했습니다"} mainFont={theme.font.B(24)}
    //          subText={`잘못된 페이지로 접근했거나, 서비스 자체 오류일 수 있습니다.\n탭을 닫고 다시 접속해주세요.`} subFont={theme.font.M(18)}
    //          gap={20} />
    //   <S.Button onClick={() => window.location.replace("/")}>
    //     홈으로
    //   </S.Button>
    // </S.Wrapper>
  )
}

// const S = {
//   Wrapper: styled.div`
//     position: fixed;
//     text-align: center;
//     min-width: 250px;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     ${({theme}) => fontStyle(theme.font.B(24))};
//   `,
//   Button: styled.div`
//     display: inline-block;
//     padding: 8px 12px;
//     margin-top: 20px;
//     border-radius: 8px;
//     background: ${({theme}) => theme.color.point["300"]};
//     cursor: pointer;
//   `,
// }