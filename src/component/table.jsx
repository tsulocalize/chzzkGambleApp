import React from 'react'
import styles from './table.module.css'

export default function Table({ data }) {
    if (data.length === 0) {
        return <p>No data available</p>
    }

    const headers = Object.keys(data[0]).slice(0, 3) // Limit to 3 columns

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
    )
}