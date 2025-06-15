import React, { useState } from 'react';
import styles from './Metrics.module.css';

interface MetricCalculatorProps {
  metric: string;
  dBlock: string;
  children: React.ReactNode;
}

export const MetricCalculator: React.FC<MetricCalculatorProps> = ({
  metric,
  dBlock,
  children
}) => {
  return (
    <div className={styles.calculatorContainer}>
      <h4 className={styles.calculatorTitle}>
        {metric} Calculator <span className={styles.dBlockBadge}>{dBlock}</span>
      </h4>
      <div className={styles.calculatorContent}>
        {children}
      </div>
    </div>
  );
};

interface InputsProps {
  children: React.ReactNode;
}

export const Inputs: React.FC<InputsProps> = ({ children }) => {
  return (
    <div className={styles.inputsContainer}>
      <h5 className={styles.inputsTitle}>Inputs</h5>
      <div className={styles.inputsFields}>
        {children}
      </div>
    </div>
  );
};

interface InputProps {
  name: string;
  label: string;
  type?: string;
  min?: number;
  max?: number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  type = 'number',
  min,
  max,
  defaultValue = '',
  onChange
}) => {
  const [value, setValue] = useState(defaultValue);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  
  return (
    <div className={styles.inputField}>
      <label htmlFor={name} className={styles.inputLabel}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={styles.input}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
      />
    </div>
  );
};

interface OutputProps {
  children: React.ReactNode;
}

export const Output: React.FC<OutputProps> = ({ children }) => {
  return (
    <div className={styles.outputContainer}>
      <h5 className={styles.outputTitle}>Result</h5>
      <div className={styles.outputContent}>
        {children}
      </div>
    </div>
  );
};

interface ResultProps {
  metric: string;
  value: number | string;
}

export const Result: React.FC<ResultProps> = ({ metric, value }) => {
  return (
    <div className={styles.resultDisplay}>
      <span className={styles.resultLabel}>{metric}:</span>
      <span className={styles.resultValue}>{value}</span>
    </div>
  );
};

interface InterpretationProps {
  value: number;
  children: React.ReactNode;
}

export const Interpretation: React.FC<InterpretationProps> = ({ value, children }) => {
  return (
    <div className={styles.interpretation}>
      <h6 className={styles.interpretationTitle}>Interpretation</h6>
      <div className={styles.interpretationContent}>
        {children}
      </div>
    </div>
  );
};

interface GoodResultProps {
  children: React.ReactNode;
}

export const GoodResult: React.FC<GoodResultProps> = ({ children }) => {
  return (
    <div className={styles.goodResult}>
      <span className={styles.goodResultIcon}>✓</span>
      <span className={styles.goodResultText}>{children}</span>
    </div>
  );
};

interface NeedsImprovementProps {
  children: React.ReactNode;
}

export const NeedsImprovement: React.FC<NeedsImprovementProps> = ({ children }) => {
  return (
    <div className={styles.needsImprovement}>
      <span className={styles.needsImprovementIcon}>!</span>
      <span className={styles.needsImprovementText}>{children}</span>
    </div>
  );
};

interface ActionableInsightsProps {
  children: React.ReactNode;
}

export const ActionableInsights: React.FC<ActionableInsightsProps> = ({ children }) => {
  return (
    <div className={styles.actionableInsights}>
      <h5 className={styles.actionableInsightsTitle}>What to Do Next</h5>
      <div className={styles.actionableInsightsContent}>
        {children}
      </div>
    </div>
  );
};

interface NextStepsProps {
  metric: string;
  currentValue: number;
}

export const NextSteps: React.FC<NextStepsProps> = ({ metric, currentValue }) => {
  // This is a placeholder. In a real implementation, you'd have logic to provide tailored advice
  return (
    <ul className={styles.nextStepsList}>
      <li>Analyze the current {metric} value of {currentValue}</li>
      <li>Compare with industry benchmarks</li>
      <li>Identify key factors affecting your {metric}</li>
      <li>Set improvement targets for next quarter</li>
      <li>Implement action plan based on industry best practices</li>
    </ul>
  );
}; 