import React, { useEffect, useState } from 'react';
import Routes from './components/Routes/Routes';

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8081/auth/refresh_token', {
            method: 'POST',
            // credentials: 'include',
        }).then(async ( response ) => {
            const data = await response.json();
            console.log(data);
            setLoading(false);
        });
    }, []);

    return (
        <>
            {loading
                ? <p>Loading...</p>
                : <Routes/>
            }
        </>
    );

};

export default App;
