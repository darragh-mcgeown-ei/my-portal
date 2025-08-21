import styles from "../HomepageFeatures/styles.module.css";
import React from "react";
import Link from "@docusaurus/core/lib/client/exports/Link";
import moment from "moment";

export default function ScheduleEventCard(props) {
    const {maintenance} = props

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

    return (
        <div key={maintenance.pk}>
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
    );
}
