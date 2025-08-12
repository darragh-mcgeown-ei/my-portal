import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HealthCheckTable from '@site/src/components/HealthCheckTable';
import React, {useEffect, useState} from "react"

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();

    const [status, setStatus] = useState(null);

    useEffect(() => {
        fetch('https://zx3l5jx0g3d2.statuspage.io/api/v2/summary.json')
            .then(res => res.json())
            .then(data => setStatus(data))
            .catch(console.error);
    }, []);

    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={"all_systems_status"}>
                    <Link className="button button--secondary button--lg">
                        <span className="ring-container">
                            <span className="ringring" status={status ? status.status.indicator : "operational"}></span>
                            <span className="circle" status={status ? status.status.indicator : "operational"}></span>
                        </span>
                        {status ? status.status.description : "All Systems Operational"}
                    </Link>
                </div>
            </div>

        </header>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader/>
            <main>
                <HomepageFeatures/>
                <HealthCheckTable/>
            </main>
        </Layout>
    );
}
