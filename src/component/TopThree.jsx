export function TopThree({ data }) {
  const topThree = data.slice(0, 3)
  const trophyColors = ['text-yellow-400', 'text-gray-400', 'text-amber-600']

  return (
    <div className="grid grid-cols-3 gap-4 mb-12">
      {topThree.map((item, index) => (
        <div key={item.id} className="min-w-[7rem] relative bg-white p-6 rounded-lg shadow-md">
          <div className={`absolute -top-1 left-1/2 -translate-x-1/2 h-8 w-8 text-center ${trophyColors[index]}`}>
            🏆
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">#{item.rank}</div>
            <div className="text-sm text-gray-600">제목: {item.element.videoName}</div>
            <div className="font-medium">치즈: {item.element.cheese}</div>
            <div className="font-medium">도네 횟수: {item.element.count}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
