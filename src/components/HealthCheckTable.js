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
        <div className={"container"} >
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
                            <tbody>
                            {componentGroup.components.map((component) => {
                                const lastUpdated = moment(component.updated_at).fromNow();
                                return <tr key={component.id}>
                                    <td>
                                        <span className="ring-container">
                                            <span className="ringring" status={component.status}></span>
                                            <span className="circle" status={component.status}></span>
                                        </span>
                                        <span>{component.name}</span>
                                    </td>
                                    <td>No issues reported</td>
                                    <td>Last updated {lastUpdated} ago</td>
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