import React, {useEffect, useMemo, useState} from 'react'
import styles from './table.module.css'
import './video-table.module.css'

export default function VideoTable({ data, setVideoId, unitPrice }) {
  const [selectedRowIndex, setSelectedRowIndex] = useState(1);
  const [dataLength, setDataLength] = useState(0);
  const accCheese = useMemo(() => {
    const result = data.reduceRight(
      (acc, item, index) => {
        const before = acc[index + 1] | 0;
        acc[index] = before + item.cheese;
        return acc;
      }, []
    );

    result.shift(); // remove first
    result.push(0); // append 0

    return result;
  }, [data]);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    setSelectedRowIndex(selectedRowIndex + data.length - dataLength);
    setDataLength(data.length);

  }, [data, selectedRowIndex, dataLength]);

  if (data.length === 0) {
    return <p>기록된 영상 도네이션이 없습니다.</p>;
  }

  const headers = ['No.', '영상 제목', '치즈', '생성 시간', '⏳'];
  const headersInData = ['id', 'videoName', 'cheese', 'createdAt', 'timeTo'];

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
              if (header === 'timeTo') {
                tableData = formatTimeTo((accCheese[index] - accCheese[selectedRowIndex]) / unitPrice);
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
    return Math.round(second) + '초';
  }
  if (absSecond < 3600) {
    return Math.round(second / 60) + '분';
  }

  return Math.round(second / 3600) + '시간';
}