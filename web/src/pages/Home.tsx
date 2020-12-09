import React from 'react';
import { useUsersQuery } from '../graphql/generated/hooks';

const Home = () => {
    const { data, loading, error } = useUsersQuery({ fetchPolicy: 'network-only' });

    const fetchData = () => {
        if (!loading)
            return !error
                ? data?.users.map(( { id, email } ) => <p key={id}>{email}</p>)
                : <p>{error.message}</p>;
        else return <p>Loading...</p>;
    };

    return (
        <div>
            <p>
                <strong>Users:</strong>
            </p>
            {fetchData()}
        </div>
    );
};

export default Home;
