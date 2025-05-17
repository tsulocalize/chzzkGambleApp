import React, {useEffect, useMemo, useState} from 'react'
import styles from './table.module.css'
import './video-table.module.css'

export default function VideoTable2({ data, setVideoId, unitPrice }) {
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [dataLength, setDataLength] = useState(0);

  // 1. 배열 합치기
  const mergedData = [...(data.general || []), ...(data.highlighter || [])];

  // 2. 최신순으로 정렬
  mergedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const mergedAccCheese = useMemo(() => {
    const result = mergedData.reduceRight(
      (acc, item, index) => {
        const before = acc[index + 1] | 0;
        acc[index] = before + item.cheese;
        return acc;
      }, []
    );

    result.shift(); // remove first
    result.push(0); // append 0

    return result;
  }, [mergedData]);

  useEffect(() => {
    if (mergedData.length === 0) return;
    setSelectedRowIndex(selectedRowIndex + mergedData.length - dataLength);
    setDataLength(mergedData.length);

  }, [mergedData, selectedRowIndex, dataLength]);

  if (mergedData.length === 0) {
    return <p>기록된 영상 도네이션이 없습니다.</p>;
  }

  const headers = ['No.', '영상 제목', '치즈', '생성 시간', '⏳'];
  const headersInData = ['id', 'videoName', 'cheese', 'createdAt', 'timeTo'];

  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
    setVideoId(mergedData[index].videoId);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
        <tr>
          {headers
            .map((header) => (
            <th key={header} className={styles.th}>
              {header}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {mergedData
            .map((row, index) => (
              <tr
                key={index}
                className={`${styles.tr} ${selectedRowIndex === index ? styles.generalSelected : ''}`} // Apply 'selected' class if this row is selected
                onClick={() => handleRowClick(index)} // Handle row click
              >
                {headersInData.map((header) => {
                  let tableData = row[header];
                  if (header === 'createdAt') {
                    tableData = formatDate(row[header]);
                  }
                  if (header === 'id') {
                    tableData = mergedData.length - (index)
                  }
                  if (header === 'timeTo') {
                    tableData = formatTimeTo((mergedAccCheese[index] - mergedAccCheese[selectedRowIndex]) / unitPrice);
                  }
                  return (
                    <td key={header} className={`${styles.td} ${selectedRowIndex === index ? styles.generalSelected : ''}`}>
                      {tableData}
                    </td>
                  )})}
              </tr>
            ))
        }
        </tbody>
      </table>
    </div>
  );
}

// Function to format the date
function formatDate(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

function formatTimeTo(second) {
  if (second === 0) {
    return 'NOW';
  }

  const absSecond = Math.abs(second);

  if (absSecond < 60) {
    return Math.floor(second) + '초';
  }
  if (absSecond < 3600) {
    return Math.floor(second / 60) + '분';
  }

  if (isNaN(second)) {
    return '-';
  }

  return Math.floor(second / 3600) + '시간';
}