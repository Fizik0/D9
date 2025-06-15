import React from 'react';
import styles from './Metrics.module.css';

interface MetricDefinitionProps {
  name: string;
  category: string;
  dBlock: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  children: React.ReactNode;
}

export const MetricDefinition: React.FC<MetricDefinitionProps> = ({
  name,
  category,
  dBlock,
  importance,
  children
}) => {
  return (
    <div className={`${styles.metricContainer} ${styles[`importance${importance.charAt(0).toUpperCase() + importance.slice(1)}`]}`}>
      <div className={styles.metricHeader}>
        <h3 className={styles.metricName}>{name}</h3>
        <div className={styles.metricMeta}>
          <span className={styles.metricCategory}>Category: {category}</span>
          <span className={styles.metricDBlock}>D-Block: {dBlock}</span>
          <span className={`${styles.metricImportance} ${styles[`importance${importance.charAt(0).toUpperCase() + importance.slice(1)}`]}`}>
            {importance.charAt(0).toUpperCase() + importance.slice(1)} Importance
          </span>
        </div>
      </div>
      <div className={styles.metricContent}>
        {children}
      </div>
    </div>
  );
};

interface FormulaProps {
  children: React.ReactNode;
}

export const Formula: React.FC<FormulaProps> = ({ children }) => {
  return (
    <div className={styles.formula}>
      <h4 className={styles.formulaTitle}>Formula</h4>
      <div className={styles.formulaContent}>
        {children}
      </div>
    </div>
  );
};

interface BusinessImpactProps {
  children: React.ReactNode;
}

export const BusinessImpact: React.FC<BusinessImpactProps> = ({ children }) => {
  return (
    <div className={styles.businessImpact}>
      <h4 className={styles.businessImpactTitle}>Business Impact</h4>
      <div className={styles.businessImpactContent}>
        {children}
      </div>
    </div>
  );
};

interface WhenToMeasureProps {
  children: React.ReactNode;
}

export const WhenToMeasure: React.FC<WhenToMeasureProps> = ({ children }) => {
  return (
    <div className={styles.whenToMeasure}>
      <h4 className={styles.whenToMeasureTitle}>When to Measure</h4>
      <div className={styles.whenToMeasureContent}>
        {children}
      </div>
    </div>
  );
}; 