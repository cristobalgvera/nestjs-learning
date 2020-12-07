import React from 'react';
import { useWhoAmIQuery } from '../graphql/generated/hooks';

const Profile = () => {
    const { data, loading, error } = useWhoAmIQuery();

    return (
        <div>
            {error && <p>{error.message}</p>}
            {loading
                ? <p>Loading...</p>
                : <p>Hi, {data?.whoAmI.email}!</p>}
        </div>
    );
}
;

export default Profile;
