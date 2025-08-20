import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Link from "@docusaurus/core/lib/client/exports/Link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleXmark, faCircleCheck, faChartLine, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'

const _ = require('lodash');

export default function HealthCheckTable(props) {
    const [expanded, setExpanded] = useState({});
    const {components, active_incidents} = props;
    const componentGroups = components.filter(component => component.is_group)
    componentGroups.forEach(group => group.components = components.filter(component => component.group_id === group.pk))

    const mappedComponentGroups = componentGroups.map(group => {

        let groupStatus = _.replace(group.status, "-", " ")
        groupStatus = _.startCase(groupStatus);

        // prepare icon
        let icon = <FontAwesomeIcon icon={faCircleCheck}/>;
        if (group.status === "major-outage") {
            icon = <FontAwesomeIcon icon={faCircleXmark}/>
        } else if (group.status === "degraded-performance") {
            icon = <FontAwesomeIcon icon={faChartLine} />
        } else if(group.status === "partial-outage") {
            icon = <FontAwesomeIcon icon={faTriangleExclamation} />
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
                icon = <FontAwesomeIcon icon={faChartLine} />
            } else if(component.status === "partial-outage") {
                icon = <FontAwesomeIcon icon={faTriangleExclamation} />
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
        return <div key={group.pk} style={{paddingLeft: 50 + 'px'}}>
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
        <div className={"container"}>
            <div>
                <h3 style={{paddingLeft: 50 + 'px'}}>Scheduled Maintenance</h3>


                <h3 style={{paddingLeft: 50 + 'px'}}>Service Status</h3>
                {mappedComponentGroups}
                <div style={{paddingLeft: 50 + 'px', paddingBottom: 100 + 'px', paddingTop:15 + 'px'}}>
                    Visit our&nbsp;
                    <Link to={"https://uptime.com/statuspage/ei-ndc-status"}>full service status page</Link>
                    &nbsp;to view historical uptime and non-production status
                </div>
            </div>
        </div>
    );
}