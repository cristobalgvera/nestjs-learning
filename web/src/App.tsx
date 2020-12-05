import React from 'react';
import { useUsersQuery } from './graphql/generated/hooks';

function App() {
    const {data, loading} = useUsersQuery();

    return (
        <div>
            Hello
            {loading ? (
                <p>Loading...</p>
            ) : (
                data?.users.map(( { email, id } ) => <p key={id}>{email}</p>)
            )}
        </div>
    );
}

export default App;
