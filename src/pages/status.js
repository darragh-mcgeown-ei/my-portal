import React, { useEffect , useState} from 'react';
import Layout from '@theme/Layout';

export default function StatusPage() {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        fetch('https://zx3l5jx0g3d2.statuspage.io/api/v2/summary.json')
            .then(res => res.json())
            .then(data => setStatus(data))
            .catch(console.error);
    }, []);

    return (
        <Layout title="System Status">
            <div className="container">
                <h1>System Status</h1>
                {status ? (
                    <p>
                        Current status: <strong>{status.status.description}</strong>
                    </p>
                ) : (
                    <p>Loading status…</p>
                )}
            </div>
        </Layout>
    );
}