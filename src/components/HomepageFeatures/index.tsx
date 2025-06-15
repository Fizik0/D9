import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Комплексная система',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        9D методология предлагает полную систему продуктового менеджмента, 
        охватывающую весь жизненный цикл продукта от идеи до масштабирования.
      </>
    ),
  },
  {
    title: 'Научно обоснованный подход',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Каждый блок методологии основан на научных принципах и лучших практиках 
        с четкими метриками, диагностическими вопросами и инструментами оценки.
      </>
    ),
  },
  {
    title: 'Прогрессивное обучение',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        9D построена по принципу прогрессивного обучения, позволяя командам 
        постепенно повышать уровень мастерства от базового до продвинутого.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
