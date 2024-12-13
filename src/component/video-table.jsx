import React, { useState } from 'react'
import styles from './table.module.css'

export default function VideoTable({ data, videoId, setVideoId }) {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  if (data.length === 0) {
    return <p>No data available</p>;
  }

  const headers = Object.keys(data[0]).slice(0, 6); // Limit to 6 columns

  const handleRowClick = (index) => {
    setVideoId(data[index].videoId)
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className={styles.th}>
              {header}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            className={`${styles.tr} ${selectedRowIndex === index ? styles.selected : ''}`} // Apply 'selected' class if this row is selected
            onClick={() => handleRowClick(index)} // Handle row click
          >
            {headers.map((header) => (
              <td key={header} className={styles.td}>
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
