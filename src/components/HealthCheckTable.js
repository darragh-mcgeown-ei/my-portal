import React, {useEffect, useState} from 'react';
import Link from "@docusaurus/core/lib/client/exports/Link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faCircleXmark,
    faCircleCheck,
    faChartLine,
    faTriangleExclamation,
    faScrewdriverWrench,
    faHeartPulse
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';

const _ = require('lodash');

export default function HealthCheckTable(props) {
    const [expanded, setExpanded] = useState({});
    const {components, upcoming_maintenance} = props;
    const componentGroups = components.filter(component => component.is_group)
    componentGroups.forEach(group => group.components = components.filter(component => component.group_id === group.pk))

    console.log(upcoming_maintenance)
    const upcomingMaintenance = upcoming_maintenance.map(maintenance => {
        const start = moment(maintenance.starts_at); // example start time (IST)
        const end = moment(maintenance.end_at);   // example end time (IST)
        const startStr = start.format("MMM DD, YYYY HH:mm z");
        const endStr = end.format("MMM DD, YYYY HH:mm z");
        const duration = moment.duration(maintenance.duration, "seconds");

        let formatted;
        if (duration.asSeconds() < 60) {
            formatted = `${Math.round(duration.asSeconds())} seconds`;
        } else if (duration.asMinutes() < 60) {
            formatted = `${Math.round(duration.asMinutes())} minutes`;
        } else if (duration.asHours() < 24) {
            formatted = `${Math.round(duration.asHours())} hours`;
        } else {
            formatted = `${Math.round(duration.asDays())} days`;
        }
        const period = `${startStr} — ${endStr} (${formatted})`;

        return <div key={maintenance.pk}>
            <div className={"incident incident-group"} status={maintenance.incident_state}>
                <div className={"incident-indicator"}/>
                <div className={"incident-heading"}>
                    <Link to={"https://uptime.com/statuspage/ei-ndc-status"}>{maintenance.name}</Link>
                    <span className={"muted"}>{period}</span>
                </div>
                <div className={"incident-status"}>
                    <Link to={"https://uptime.com/statuspage/ei-ndc-status"}>
                        {maintenance.affected_components.length} affected component(s)
                    </Link>
                </div>
            </div>
        </div>
    })

    const mappedComponentGroups = componentGroups.map(group => {

        let groupStatus = _.replace(group.status, "-", " ")
        groupStatus = _.startCase(groupStatus);

        // prepare icon
        let icon = <FontAwesomeIcon icon={faCircleCheck}/>;
        if (group.status === "major-outage") {
            icon = <FontAwesomeIcon icon={faCircleXmark}/>
        } else if (group.status === "degraded-performance") {
            icon = <FontAwesomeIcon icon={faChartLine}/>
        } else if (group.status === "partial-outage") {
            icon = <FontAwesomeIcon icon={faTriangleExclamation}/>
        }

        const mappedComponents = group.components.map(component => {
            // prepare status text
            let status = _.replace(component.status, "-", " ")
            status = _.startCase(status);
            // prepare icon
            let icon = <FontAwesomeIcon icon={faCircleCheck}/>;
            if (component.status === "major-outage") {
                icon = <FontAwesomeIcon icon={faCircleXmark}/>
            } else if (component.status === "degraded-performance") {
                icon = <FontAwesomeIcon icon={faChartLine}/>
            } else if (component.status === "partial-outage") {
                icon = <FontAwesomeIcon icon={faTriangleExclamation}/>
            }

            return <div className={"incident"} status={component.status}>
                <div className={"incident-indicator"}/>
                <div className={"incident-heading"}>
                    <a href={"https://uptime.com/statuspage/ei-ndc-status"}>{component.name}</a>
                </div>
                <div className={"incident-status"}>
                    {icon}
                    {status}
                </div>
            </div>
        })

        const toggleIncident = (id) => {
            setExpanded((prev) => ({
                ...prev,
                [id]: !prev[id], // flip state for this incident
            }));
        };
        // managed expanded settings


        const expandedClass = expanded[group.pk] ? "expanded" : "";
        // render group
        return <div key={group.pk}>
            <div className={"incident incident-group"} status={group.status}
                 onClick={() => toggleIncident(group.pk)}>
                <div className={"incident-indicator"}/>
                <div className={"incident-heading"}>
                    <span className={`caret ${expandedClass}`}/>
                    {group.name}
                </div>
                <div className={"incident-status"}>
                    {icon}
                    {groupStatus}
                </div>
            </div>
            <div className={"incident-subcomponent-list"}>
                {expanded[group.pk] && mappedComponents}
            </div>
        </div>
    })


    return (
        <div className={"container health-table-container"}>
            <h3>
                <FontAwesomeIcon icon={faScrewdriverWrench}/>
                Scheduled Maintenance
            </h3>
            {upcomingMaintenance}
            <h3>
                <FontAwesomeIcon icon={faHeartPulse}/>
                Service Status
            </h3>
            {mappedComponentGroups}
            <div style={{paddingBottom: 100 + 'px', paddingTop: 15 + 'px'}}>
                Visit our&nbsp;
                <Link to={"https://uptime.com/statuspage/ei-ndc-status"}>full service status page</Link>
                &nbsp;to view historical uptime and non-production status
            </div>
        </div>
    );
}