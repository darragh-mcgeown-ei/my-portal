import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Link from "@docusaurus/core/lib/client/exports/Link";

export default function HealthCheckTable() {

    const [status, setStatus] = useState({
        componentGroups: []
    });

    useEffect(() => {
        fetch('https://zx3l5jx0g3d2.statuspage.io/api/v2/summary.json')
            .then(res => res.json())
            .then(data => {
                // map the groups
                data.componentGroups = data.components.filter(it => it.group).map(group => {
                    // populate with components
                    return {
                        ...group,
                        components: data.components.filter(component => group.id === component.group_id),
                    }
                })
                setStatus(data)
            })
            .catch(console.error);
    }, []);

    return (
        <div className={"container"}>
            {
                status.componentGroups.map(componentGroup => {
                    return <div key={componentGroup.id} style={{paddingLeft: 50 + 'px'}}>
                        <h2>
                            <span className="ring-container">
                                <span className="ringring" status={componentGroup.status}></span>
                                <span className="circle" status={componentGroup.status}></span>
                            </span>
                            <span>{componentGroup.name} Status</span>
                        </h2>
                        <table className="health-table">
                            <colgroup>
                                <col style={{minWidth: 30 + '%'}}></col>
                                <col style={{minWidth: 40 + '%'}}></col>
                            </colgroup>
                            <tbody>
                            {componentGroup.components.map((component) => {
                                const lastUpdated = moment(component.updated_at).fromNow();

                                const relatedIncidents = status.incidents.filter(incident => {
                                    let incidentsFound = incident.components.find(incidentComponent => {
                                        return incidentComponent.id === component.id;
                                    });
                                    return !!incidentsFound
                                })

                                let mappedRelatedIncidents = <span style={{color: "grey", fontStyle: "italic"}}>No active incidents for this component</span>

                                if(relatedIncidents.length > 0) {
                                    mappedRelatedIncidents = relatedIncidents.map((relatedIncident, index) => {
                                        const spacingClass = index > 0 ? "margin-t10": "margin-t6";
                                        return <li className="incident-item" key={index}>
                                            <div className={"incident-top " + spacingClass}>
                                                  <span className="incident-title" title={relatedIncident.name}>
                                                         <Link to={"https://playground13.statuspage.io/incidents/" + relatedIncident.id}>
                                                             {relatedIncident.name}
                                                         </Link>
                                                  </span>
                                                <span className="incident-badge badge-investigating" aria-hidden="true">{relatedIncident.status}</span>
                                            </div>
                                            <div className="incident-meta">
                                                <span>Last updated {lastUpdated}</span>
                                            </div>
                                        </li>
                                    })
                                }

                                return <tr key={component.id}>
                                    <td>
                                        <span className="ring-container">
                                            <span className="ringring" status={component.status}></span>
                                            <span className="circle" status={component.status}></span>
                                        </span>
                                        <span>{component.name}</span>
                                    </td>
                                    <td>
                                        <ul>{mappedRelatedIncidents}</ul>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                })

            }
            <div style={{paddingLeft: 50 + 'px', paddingBottom: 100 + 'px'}}>
                Visit our&nbsp;
                <Link to={"https://playground13.statuspage.io/"}>full service status page</Link>
                &nbsp;to view historical uptime and non-production status
            </div>
        </div>
    );
}