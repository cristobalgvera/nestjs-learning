import Link from 'next/link';
import { ROUTES, userRoute } from './routes.path';
import { useAppState } from '../../hooks';

const Routes = () => {
    const { data: { user }, logic: { login } } = useAppState();

    return (
        <>
            <Link href={ROUTES.HOME}>
                <a>Home</a>
            </Link>
            {user.username !== '' ? (
                <Link href={userRoute.profile(user.username)}>
                    <a>User</a>
                </Link>
            ) : (
                <Link href={ROUTES.SIGN_IN}>
                    <a>Sign in</a>
                </Link>
            )
            }

        </>
    );
};

export default Routes;