import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import React from "react";

const FeatureList = [
  {
    title: 'Register Now',
    Svg: require('@site/static/img/undraw_sign-up_qamz.svg').default,
    description: (
      <>
          Register today to starting integrating with out latest NDC APIs.
      </>
    ),
  },
  {
    title: 'Documentation',
    Svg: require('@site/static/img/undraw_sign-up_qamz.svg').default,
    description: (
      <>
          Get access to all the documentation needed for your customers’ journeys.
      </>
    ),
  },
  {
    title: 'Support',
    Svg: require('@site/static/img/undraw_sign-up_qamz.svg').default,
    description: (
      <>
          Find all the support you need for getting the most out of our NDC capabilities.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
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

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
        adssd
        <div className="status-wrap" role="status" aria-live="polite" aria-atomic="true">
            <span className="status-dot status--operational" aria-hidden="true"></span>
            <span className="status-label">Operational</span>
        </div>
    </section>
  );
}
