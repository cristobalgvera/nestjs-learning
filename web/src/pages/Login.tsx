import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useLoginMutation } from '../graphql/generated/hooks';
import { setAccessToken } from '../common/accessToken';
import { useHistory } from 'react-router-dom';
import { ROUTE } from '../components/Routes/route';

interface Credential {
    email: string;
    password: string;
}

const initialCredentialState: Credential = {
    email: '',
    password: '',
};

const Login = () => {
    const [credential, setCredential] = useState(initialCredentialState);
    const { password, email } = credential;

    const [login] = useLoginMutation();
    const history = useHistory();

    const handleInputChange = ( { target: { value, name } }: ChangeEvent<HTMLInputElement> ) => {
        setCredential(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = async ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        const response = await login({
            variables: {
                email: email,
                password: password,
            },
        });

        if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
            history.push(ROUTE.PROFILE);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <input
                    value={email}
                    name="email"
                    type="email"
                    placeholder="email"
                    onChange={handleInputChange}
                />
                <input
                    value={password}
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={handleInputChange}
                />
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default Login;
