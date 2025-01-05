export function CriteriaSelector({ currentCriteria, onCriteriaChange }) {
  return (
    <div className="flex gap-4 mb-8">
      <button
        className={`px-4 py-2 rounded-md ${currentCriteria === 'COMBINED' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        onClick={() => onCriteriaChange('COMBINED')}
      >
        종합
      </button>
      <button
        className={`px-4 py-2 rounded-md ${currentCriteria === 'CHEESE' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        onClick={() => onCriteriaChange('CHEESE')}
      >
        치즈
      </button>
      <button
        className={`px-4 py-2 rounded-md ${currentCriteria === 'COUNT' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        onClick={() => onCriteriaChange('COUNT')}
      >
        개수
      </button>

    </div>
  )
}

