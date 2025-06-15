import React from 'react';
import styles from './ExpertQuote.module.css';

interface ExpertQuoteProps {
  author: string;
  book?: string;
  source?: string;
  context?: string;
  children: React.ReactNode;
}

export const ExpertQuote: React.FC<ExpertQuoteProps> = ({ 
  author, 
  book, 
  source, 
  context, 
  children 
}) => {
  return (
    <div className={styles.quoteContainer}>
      {context && (
        <div className={styles.quoteContext}>
          <span>Context: {context}</span>
        </div>
      )}
      <blockquote className={styles.quote}>
        {children}
      </blockquote>
      <footer className={styles.quoteFooter}>
        <strong>{author}</strong>
        {book && <span>, {book}</span>}
        {source && !book && <span>, {source}</span>}
      </footer>
    </div>
  );
};

export const ProblemQuote: React.FC<ExpertQuoteProps> = (props) => {
  return (
    <div className={`${styles.quoteContainer} ${styles.problemQuote}`}>
      <div className={styles.quoteType}>Problem Insight</div>
      <ExpertQuote {...props} />
    </div>
  );
};

export const SolutionQuote: React.FC<ExpertQuoteProps> = (props) => {
  return (
    <div className={`${styles.quoteContainer} ${styles.solutionQuote}`}>
      <div className={styles.quoteType}>Solution Framework</div>
      <ExpertQuote {...props} />
    </div>
  );
};

export const ConceptQuote: React.FC<ExpertQuoteProps> = (props) => {
  return (
    <div className={`${styles.quoteContainer} ${styles.conceptQuote}`}>
      <div className={styles.quoteType}>Conceptual Understanding</div>
      <ExpertQuote {...props} />
    </div>
  );
}; 