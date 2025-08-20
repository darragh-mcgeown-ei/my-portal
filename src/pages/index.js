import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HealthCheckTable from '@site/src/components/HealthCheckTable';
import React, {useEffect, useState} from "react"
import axios from 'axios';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader(props) {
    const {siteConfig} = useDocusaurusContext();
    const {active_incidents} = props;
    const systemStatus = active_incidents.length <= 0 ? "operational" : "outage";
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className="ndc-hero__status all_systems_status">
                    <span className="ring-container" status={systemStatus}>
                        <span className="ringring"></span>
                        <span className="circle"></span>
                    </span>
                    <div className="ndc-hero__status-message" status={systemStatus}>
                        <a className="ndc-hero__status-message-text" href={"https://uptime.com/statuspage/ei-ndc-status"}
                           target={"_blank"}>
                            {active_incidents.length <= 0 ?  "All Systems Operational": "Some systems are experiencing issues"}
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    const [uptime, setUptime] = useState({
        active_incidents: [],
        upcoming_maintenance: [],
        components: []
    });

    useEffect(() => {
        axios.get('https://w8qe0bqjej.execute-api.eu-west-1.amazonaws.com/ndc-sandbox/api/v2/ndc-service/ndc/status')
            .then((response) => setUptime(response.data))
            .catch(console.error);
    }, []);

    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader active_incidents={uptime.active_incidents}/>
            <main>
                <HomepageFeatures/>
                {uptime.pk && <HealthCheckTable components={uptime.components}
                                                upcoming_maintenance={uptime.upcoming_maintenance}/>}
            </main>
        </Layout>
    );
}
