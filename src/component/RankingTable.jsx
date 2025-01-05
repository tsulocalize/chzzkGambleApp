'use client'

import { useEffect, useRef } from "react"

export function RankingTable({ data }) {
  const observerTarget = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
        <tr className="bg-gray-100">
          <th className="w-20 p-2 text-left">랭킹</th>
          <th className="p-2 text-left">제목</th>
          <th className="min-w-[5rem] p-2 text-right">치즈</th>
          <th className="min-w-[5rem] p-2 text-right">도네 횟수</th>
        </tr>
        </thead>
        <tbody>
        {data.slice(3).map((item, index) => (
          <tr key={item.id} className="border-t">
            <td className="p-2 font-medium">#{item.rank}</td>
            <td className="p-2">{item.element.videoName}</td>
            <td className="p-2 text-right">{item.element.cheese}</td>
            <td className="p-2 text-right">{item.element.count}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div ref={observerTarget} className="h-4" />
    </div>
  )
}

