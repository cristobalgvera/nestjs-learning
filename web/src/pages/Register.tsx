import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRegisterMutation } from '../graphql/generated/hooks';
import { ROUTE } from '../components/Routes/route';

interface Credential {
    email: string;
    password: string;
}

const initialCredentialState: Credential = {
    email: '',
    password: '',
};

const Register = () => {
    const [credential, setCredential] = useState(initialCredentialState);
    const { password, email } = credential;

    const [register] = useRegisterMutation();
    const history = useHistory();

    const handleInputChange = ( { target: { value, name } }: ChangeEvent<HTMLInputElement> ) => {
        setCredential(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = async ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        await register({
            variables: {
                email: email,
                password: password,
            },
        });
        history.push(ROUTE.HOME);
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
                <button type="submit">Register</button>
            </div>
        </form>
    );
};

export default Register;
