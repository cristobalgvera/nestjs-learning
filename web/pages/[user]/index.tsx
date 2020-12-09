import Link from 'next/link';
import { userRoute } from '../../components/Routes/routes.path';
import { useAppState } from '../../hooks';

function Profile() {
    const { data: { user } } = useAppState();
    const { username } = user;

    return (
        <div>
            <Link href={userRoute.list(username)}>
                <a>List</a>
            </Link>
            <h1>
                {username}
            </h1>
        </div>
    );
}

export default Profile;