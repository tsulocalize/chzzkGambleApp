import React, {useEffect, useState} from 'react'
import styles from './table.module.css'

export default function VideoTable({ data, setVideoId }) {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    if (data.length === 0 || selectedRowIndex === null) {
      return;
    }
    setSelectedRowIndex(selectedRowIndex + data.length - dataLength);
    setDataLength(data.length);
  }, [data, selectedRowIndex, dataLength]);

  if (data.length === 0) {
    return <p>기록된 영상 도네이션이 없습니다.</p>;
  }

  const headers = ['No.', '영상 제목', '치즈', '생성 일자'];
  const headersInData = ['id', 'videoName', 'cheese', 'createdAt'];

  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
    setVideoId(data[index].videoId)
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
        {data
          .map((row, index) => (
          <tr
            key={index}
            className={`${styles.tr} ${selectedRowIndex === index ? styles.selected : ''}`} // Apply 'selected' class if this row is selected
            onClick={() => handleRowClick(index)} // Handle row click
          >
            {headersInData.map((header) => {
              let tableData = row[header];
              if (header === 'createdAt') {
                tableData = formatDate(row[header]);
              }
              if (header === 'id') {
                tableData = data.length - (index)
              }
              return (
                <td key={header} className={`${styles.td} ${selectedRowIndex === index ? styles.selected : ''}`}>
                {tableData}
              </td>
            )})}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
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