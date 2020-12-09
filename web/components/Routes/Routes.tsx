import Link from 'next/link';
import { ROUTES, userRoute } from './routes.path';
import { useAppState } from '../../hooks';

const Routes = () => {
    const { data: { user: { username } } } = useAppState();

    return (
        <>
            <Link href={ROUTES.HOME}>
                <a>Home</a>
            </Link>
            {username !== '' ? (
                <Link href={userRoute.profile(username)}>
                    <a>User</a>
                </Link>
            ) : (
                <Link href={ROUTES.SIGN_IN}>
                    <a>Sign in</a>
                </Link>
            )}
        </>
    );
};

export default Routes;