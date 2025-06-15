import React, { useState, useEffect } from 'react';
import { 
  MetricCalculator, 
  Inputs, 
  Input, 
  Output, 
  Result,
  Interpretation,
  GoodResult,
  NeedsImprovement,
  ActionableInsights
} from './';
import styles from './Metrics.module.css';

interface CACCalculatorProps {
  industry?: 'saas' | 'ecommerce' | 'mobile' | 'enterprise';
}

export const CACCalculator: React.FC<CACCalculatorProps> = ({ industry = 'saas' }) => {
  const [salesExpenses, setSalesExpenses] = useState<number>(10000);
  const [marketingExpenses, setMarketingExpenses] = useState<number>(5000);
  const [newCustomers, setNewCustomers] = useState<number>(100);
  const [cac, setCAC] = useState<number>(0);
  const [status, setStatus] = useState<'good' | 'average' | 'poor'>('average');

  useEffect(() => {
    if (newCustomers === 0) {
      setCAC(0);
      return;
    }
    
    const calculatedCAC = (salesExpenses + marketingExpenses) / newCustomers;
    setCAC(calculatedCAC);
    
    // Determine status based on industry benchmarks
    if (industry === 'saas') {
      if (calculatedCAC < 300) setStatus('good');
      else if (calculatedCAC < 1000) setStatus('average');
      else setStatus('poor');
    } else if (industry === 'ecommerce') {
      if (calculatedCAC < 30) setStatus('good');
      else if (calculatedCAC < 100) setStatus('average');
      else setStatus('poor');
    } else if (industry === 'mobile') {
      if (calculatedCAC < 3) setStatus('good');
      else if (calculatedCAC < 10) setStatus('average');
      else setStatus('poor');
    } else if (industry === 'enterprise') {
      if (calculatedCAC < 5000) setStatus('good');
      else if (calculatedCAC < 15000) setStatus('average');
      else setStatus('poor');
    }
  }, [salesExpenses, marketingExpenses, newCustomers, industry]);

  const handleChangeExpenses = (value: string | number, type: 'sales' | 'marketing') => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (type === 'sales') {
      setSalesExpenses(numValue);
    } else {
      setMarketingExpenses(numValue);
    }
  };

  const handleChangeCustomers = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    setNewCustomers(numValue);
  };

  const getRecommendations = () => {
    if (status === 'good') {
      return [
        'Продолжайте оптимизировать каналы с наибольшей эффективностью',
        'Рассмотрите возможность масштабирования успешных каналов',
        'Документируйте стратегии успеха для внутреннего обучения'
      ];
    } else if (status === 'average') {
      return [
        'Проанализируйте эффективность каждого канала привлечения',
        'Оптимизируйте конверсию на каждом этапе воронки продаж',
        'Тестируйте новые каналы с потенциально низким CAC'
      ];
    } else {
      return [
        'Срочно пересмотрите стратегию привлечения клиентов',
        'Сосредоточьтесь на органических каналах и реферральных программах',
        'Временно сократите расходы на неэффективные каналы',
        'Улучшите процессы квалификации лидов'
      ];
    }
  };

  return (
    <MetricCalculator metric="CAC" dBlock="D1">
      <Inputs>
        <Input 
          name="salesExpenses" 
          label="Расходы на продажи (₽)" 
          defaultValue={salesExpenses}
          onChange={(value) => handleChangeExpenses(value, 'sales')}
        />
        <Input 
          name="marketingExpenses" 
          label="Маркетинговые расходы (₽)" 
          defaultValue={marketingExpenses}
          onChange={(value) => handleChangeExpenses(value, 'marketing')}
        />
        <Input 
          name="newCustomers" 
          label="Количество новых клиентов" 
          defaultValue={newCustomers}
          onChange={handleChangeCustomers}
        />
      </Inputs>
      
      <Output>
        <Result metric="CAC" value={`₽${cac.toFixed(2)}`} />
        <Interpretation value={cac}>
          {status === 'good' ? (
            <GoodResult>Отличный CAC для вашей индустрии ({industry})</GoodResult>
          ) : status === 'average' ? (
            <NeedsImprovement>CAC находится в приемлемом диапазоне, но есть возможности для оптимизации</NeedsImprovement>
          ) : (
            <div className={styles.poorResult}>
              <span className={styles.poorResultIcon}>⚠</span>
              <span className={styles.poorResultText}>CAC слишком высок и требует немедленного внимания</span>
            </div>
          )}
        </Interpretation>
      </Output>
      
      <ActionableInsights>
        <h6 className={styles.recommendationsTitle}>Рекомендации:</h6>
        <ul className={styles.recommendationsList}>
          {getRecommendations().map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </ActionableInsights>
    </MetricCalculator>
  );
}; 