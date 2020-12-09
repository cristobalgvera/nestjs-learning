import { ChangeEvent, FormEvent, useState } from 'react';
import { Credential } from '../../shared/interfaces';
import { useAppState } from '../../hooks';
import { useRouter } from 'next/dist/client/router';
import { ROUTES } from '../../components/Routes/routes.path';

const initialCredentialState: Credential = {
    username: '',
    password: '',
};

function SignIn() {
    const [credential, setCredential] = useState(initialCredentialState);
    const { username, password } = credential;

    const { logic: { login } } = useAppState();
    const router = useRouter();

    const handleInputChange = ( { target: { value, name: property } }: ChangeEvent<HTMLInputElement> ) => {
        setCredential(prevState => ({ ...prevState, [property]: value }));
    };

    const handleFormSubmit = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        login(credential);
        router.push(ROUTES.HOME);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                name="username"
                value={username}
                onChange={handleInputChange}
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
            />
            <button type="submit">Sign in</button>
        </form>
    );
}

export default SignIn;