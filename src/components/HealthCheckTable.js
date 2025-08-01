import React, { useEffect, useState } from 'react';

export default function HealthCheckTable() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('https://ndc.aerlingus.com/prod/ndc-portal/b2b-health.json'); // Replace with your real endpoint
                const data = await res.json();
                setResults(data);
            } catch (err) {
                console.error('Failed to fetch healthcheck data:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
        const interval = setInterval(fetchData, 30000); // poll every 30s
        return () => clearInterval(interval);
    }, []);

    if (loading) return <p>Loading health check results…</p>;

    return (
        <div className={"container"}>
            <h2>Service Status</h2>
        <table className="health-table">
            <thead>
            <tr>
                <th>Service</th>
                <th>Status</th>
                <th>Response Time (ms)</th>
            </tr>
            </thead>
            <tbody>
            {results.map((item) => (
                <tr key={item.service}>
                    <td>{item.service}</td>
                    <td style={{ color: item.status === 'up' ? 'green' : 'red', fontWeight: 'bold' }}>
                        {item.status.toUpperCase()}
                    </td>
                    <td>{item.responseTime}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}