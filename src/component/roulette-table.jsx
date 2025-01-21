import React from 'react'
import styles from './roulette-table.module.css'

export default function RouletteTable({ data }) {
  if (data.length === 0) {
      return <p>집계된 항목이 존재하지 않습니다</p>
  }

  // const headers = Object.keys(data[0]).slice(0, 3) // Limit to 3 columns
  const headers = ['No.', '내용', '표', '확률'];
  const headersInData = ['No.', 'name', 'vote', 'percentage'];

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
                <tr key={index} className={styles.tr}>
                    {headersInData.map((header) => {
                      let tableData = row[header];
                      if (header === 'No.') {
                        tableData = index + 1;
                      }
                      return (
                        <td key={header} className={styles.td}>
                          {tableData}
                        </td>
                      )
                    })}
                </tr>
              ))}
              </tbody>
          </table>
      </div>
    )
}