import React, {useState} from "react";
import _ from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faCircleCheck, faCircleXmark, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

export default function ServiceStatusCard(props) {
    const {
        service = {}
    } = props;

    const status = _.replace(service.status, "-", " ")
    // prepare icon
    let icon = <FontAwesomeIcon icon={faCircleCheck}/>;
    if (service.status === "major-outage") {
        icon = <FontAwesomeIcon icon={faCircleXmark}/>
    } else if (service.status === "degraded-performance") {
        icon = <FontAwesomeIcon icon={faChartLine}/>
    } else if (service.status === "partial-outage") {
        icon = <FontAwesomeIcon icon={faTriangleExclamation}/>
    }

    return <div key={service.key}>
        <div className={"incident "} status={service.status}>
            <div className={"incident-indicator"}/>
            <div className={"incident-heading"}>
                <a href={"https://uptime.com/statuspage/ei-ndc-status"}>{service.name}</a>
            </div>
            <div className={"incident-status"}>
                {icon}
                {_.startCase(status)}
            </div>
        </div>
    </div>
}