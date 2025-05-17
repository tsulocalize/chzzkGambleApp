import React, {useEffect, useMemo, useState} from 'react'
import styles from './table.module.css'
import './video-table.module.css'

export default function VideoTable({ data, setVideoId, unitPrice, isHighlighter }) {
  const [generalSelectedRowIndex, setGeneralSelectedRowIndex] = useState(-1);
  const [highlighterSelectedRowIndex, setHighlighterSelectedRowIndex] = useState(-1);
  const [generalDataLength, setGeneralDataLength] = useState(0);
  const [highlighterDataLength, setHighlighterDataLength] = useState(0);
  const generalData = data.general || []; // []
  const highlighterData = data.highlighter || []; // []

  const generalAccCheese = useMemo(() => {
  const result = generalData.reduceRight(
    (acc, item, index) => {
      const before = acc[index + 1] | 0;
      acc[index] = before + item.cheese;
      return acc;
    }, []
  );

    result.shift(); // remove first
    result.push(0); // append 0

    return result;
  }, [generalData]);

  const highlighterAccCheese = useMemo(() => {
    const result = highlighterData.reduceRight(
      (acc, item, index) => {
        const before = acc[index + 1] | 0;
        acc[index] = before + item.cheese;
        return acc;
      }, []
    );

    result.shift(); // remove first
    result.push(0); // append 0

    return result;
  }, [highlighterData]);

  useEffect(() => {
    if (generalData.length + highlighterData.length === 0) {
      return;
    }
    if (!isHighlighter) {
      setGeneralSelectedRowIndex(generalSelectedRowIndex + generalData.length - generalDataLength);
      setGeneralDataLength(generalData.length);
    } else {
      setHighlighterSelectedRowIndex(highlighterSelectedRowIndex + highlighterData.length - highlighterDataLength);
      setHighlighterDataLength(highlighterData.length);
    }

  }, [isHighlighter, generalSelectedRowIndex, highlighterSelectedRowIndex, generalDataLength, highlighterDataLength, generalData, highlighterData]);

  if (generalData.length + highlighterData.length === 0) {
    return <p>기록된 영상 도네이션이 없습니다.</p>;
  }

  const headers = ['No.', '영상 제목', '치즈', '생성 시간', '⏳'];
  const headersInData = ['id', 'videoName', 'cheese', 'createdAt', 'timeTo'];

  const handleRowClick = (index) => {
    if (!isHighlighter) {
      setGeneralSelectedRowIndex(index);
      setVideoId(generalData[index].videoId)
    } else {
      setHighlighterSelectedRowIndex(index);
      setVideoId(highlighterData[index].videoId)
    }
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
        {isHighlighter ? (
          highlighterData
            .map((row, index) => (
              <tr
                key={index}
                className={`${styles.tr} ${highlighterSelectedRowIndex === index ? styles.highlighterSelected : ''}`} // Apply 'selected' class if this row is selected
                onClick={() => handleRowClick(index)} // Handle row click
              >
                {headersInData.map((header) => {
                  let tableData = row[header];
                  if (header === 'createdAt') {
                    tableData = formatDate(row[header]);
                  }
                  if (header === 'id') {
                    tableData = highlighterData.length - (index)
                  }
                  if (header === 'timeTo') {
                    tableData = formatTimeTo((highlighterAccCheese[index] - highlighterAccCheese[highlighterSelectedRowIndex]) / unitPrice);
                  }
                  return (
                    <td key={header} className={`${styles.td} ${highlighterSelectedRowIndex === index ? styles.highlighterSelected : ''}`}>
                      {tableData}
                    </td>
                  )})}
              </tr>
            ))

        ) : (
          generalData
            .map((row, index) => (
              <tr
                key={index}
                className={`${styles.tr} ${generalSelectedRowIndex === index ? styles.generalSelected : ''}`} // Apply 'selected' class if this row is selected
                onClick={() => handleRowClick(index)} // Handle row click
              >
                {headersInData.map((header) => {
                  let tableData = row[header];
                  if (header === 'createdAt') {
                    tableData = formatDate(row[header]);
                  }
                  if (header === 'id') {
                    tableData = generalData.length - (index)
                  }
                  if (header === 'timeTo') {
                    tableData = formatTimeTo((generalAccCheese[index] - generalAccCheese[generalSelectedRowIndex]) / unitPrice);
                  }
                  return (
                    <td key={header} className={`${styles.td} ${generalSelectedRowIndex === index ? styles.generalSelected : ''}`}>
                      {tableData}
                    </td>
                  )})}
              </tr>
            ))
        )}
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