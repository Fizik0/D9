import React from 'react';
import styles from './Metrics.module.css';

interface BenchmarkTableProps {
  metric: string;
  industry?: string;
  children: React.ReactNode;
}

export const BenchmarkTable: React.FC<BenchmarkTableProps> = ({
  metric,
  industry,
  children
}) => {
  return (
    <div className={styles.benchmarkContainer}>
      <h4 className={styles.benchmarkTitle}>
        {metric} Benchmarks {industry && <span className={styles.industryBadge}>{industry}</span>}
      </h4>
      <div className={styles.benchmarkTableWrapper}>
        <table className={styles.benchmarkTable}>
          <thead>
            <tr>
              <th>Segment</th>
              <th>Good</th>
              <th>Average</th>
              <th>Poor</th>
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface BenchmarkProps {
  segment: string;
  good: string;
  average: string;
  poor: string;
}

export const Benchmark: React.FC<BenchmarkProps> = ({
  segment,
  good,
  average,
  poor
}) => {
  return (
    <tr className={styles.benchmarkRow}>
      <td className={styles.segmentColumn}>{segment}</td>
      <td className={styles.goodColumn}>{good}</td>
      <td className={styles.averageColumn}>{average}</td>
      <td className={styles.poorColumn}>{poor}</td>
    </tr>
  );
};

interface YourResultProps {
  value: number | string;
  status: 'good' | 'average' | 'poor' | 'unknown';
}

export const YourResult: React.FC<YourResultProps> = ({
  value,
  status
}) => {
  return (
    <tr className={`${styles.yourResultRow} ${styles[status]}`}>
      <td colSpan={4}>
        <div className={styles.yourResultContainer}>
          <span className={styles.yourResultLabel}>Your Result</span>
          <span className={`${styles.yourResultValue} ${styles[status]}`}>{value}</span>
          <span className={`${styles.yourResultStatus} ${styles[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </td>
    </tr>
  );
}; 