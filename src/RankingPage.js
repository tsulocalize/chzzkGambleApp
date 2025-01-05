'use client'

import {useEffect, useState} from "react"
import { CriteriaSelector } from "./component/CriteriaSelector"
import { TopThree } from "./component/TopThree"
import { RankingTable } from "./component/RankingTable"
import {fetchGetRanking} from "./api/getRanking";

export default function RankingPage() {
  const [criteria, setCriteria] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [now, setNow] = useState(null);

  const criteriaChanger = async (newCriteria) => {
    try {
      setCriteria(newCriteria);
      const rankData = await fetchGetRanking(newCriteria);
      setRanking(rankData.ranking);
      setNow(formatDate(rankData.now));
    } catch (error) {
      alert("서버 에러가 발생했습니다.");
    }
  }

  useEffect(() => {
    criteriaChanger("COMBINED"); // Run the function with the fixed value
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-3">영도 랭킹</h1>
      <div className="mx-auto">측정 시각 : {now}</div>
      <div className="mx-auto mb-8">(일주일 간 기록된 데이터를 기반으로 합니다)</div>

      <CriteriaSelector
        currentCriteria={criteria}
        onCriteriaChange={criteriaChanger}
      />

      <TopThree data={ranking} />

      <RankingTable
        data={ranking}
      />
    </div>
  )
}

// Function to format the date
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are 0-based, so add 1
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}년 ${month}월 ${day}일, ${hours}:${minutes}:${seconds}`;
}