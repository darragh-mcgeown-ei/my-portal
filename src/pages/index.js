import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HealthCheckTable from '@site/src/components/HealthCheckTable';
import React, {useEffect, useState} from "react"

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader({status}) {
    const {siteConfig} = useDocusaurusContext();

    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className="ndc-hero__status all_systems_status">
                    <span className="ring-container">
                        <span className="ringring" status={status ? status.status.indicator : "operational"}></span>
                        <span className="circle" status={status ? status.status.indicator : "operational"}></span>
                    </span>
                    <div className="ndc-hero__status-message">
                        <a className="ndc-hero__status-message-text" href={"https://playground13.statuspage.io/"} target={"_blank"}>
                            {status ? status.status.description : "All Systems Operational"}
                        </a>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();

    const [status, setStatus] = useState({
        status: {indicator: "operational"},
        componentGroups: []
    });

    useEffect(() => {
        fetch('https://zx3l5jx0g3d2.statuspage.io/api/v2/summary.json')
            .then(res => res.json())
            .then(data => setStatus(data))
            .catch(console.error);
    }, []);

    console.log(status)

    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader status={status}/>
            <main>
                <HomepageFeatures/>
                <HealthCheckTable status={status}/>
            </main>
        </Layout>
    );
}
