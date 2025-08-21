import React, {useEffect, useState} from 'react';
import Link from "@docusaurus/core/lib/client/exports/Link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ScheduleEventCard from "./ScheduleEventCard"
import {
    faCircleXmark,
    faCircleCheck,
    faChartLine,
    faTriangleExclamation,
    faScrewdriverWrench,
    faHeartPulse
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import ServiceStatusCard from "./ServiceStatusCard";

const _ = require('lodash');

export default function HealthCheckTable(props) {
    const [expanded, setExpanded] = useState({});
    const {components, upcoming_maintenance} = props;
    const componentGroups = components.filter(component => component.is_group)
    componentGroups.forEach(group => group.components = components.filter(component => component.group_id === group.pk))

    const upcomingMaintenance = upcoming_maintenance.map(maintenance => <ScheduleEventCard maintenance={maintenance}/>)

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

        const mappedComponents = group.components.map(component => <ServiceStatusCard service={component}/>)

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
                Upcoming Maintenance
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