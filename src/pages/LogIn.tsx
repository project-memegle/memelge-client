
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import validateId from '../components/Validations/ValidateId';
import validateLogInPassword from '../components/Validations/ValidateLogInPassword';
import { LogInRequestDTO } from '../services/dto/LogInDto';
import handleInputChange from '../utils/Event/handleInputChange';
import { errorInputCheck } from '../utils/Event/errorInputCheck';
import { resetErrors } from 'utils/Event/resetError';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { useAuth } from 'components/auth/ProvideAuth';
import { logIn } from 'services/LogInService';
import { getUserInfo } from 'services/UserInfoService';
import StorageKeyword from 'Constant/StorageKeyword';
import {
    deleteSessionStorage,
    getSessionStorages,
} from 'utils/Storage/sessionStorage';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import { useTranslation } from 'react-i18next';
import getValidationMessages from '../components/Validations/ValidationMessages';

export default function LogIn() {
    const navigate = useCustomNavigate();
    const auth = useAuth();

    const [toastMessage, setToastMessage] = useState('');
    const [toast, setToast] = useState(false);
    const ValidationMessages = getValidationMessages();
    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;
    const DEFAULT_PASSWORD = ValidationMessages.DEFAULT_PASSWORD;

    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [id, setId] = useState('testloginid3');
    const [password, setPassword] = useState('qwerQ!1234');
    const [message, setMessage] = useState('');

    const idInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    const onChangeId = useCallback(
        handleInputChange(setId, setIdError, validateId, () => {
            setMessage('');
        }),
        []
    );

    const onChangePassword = useCallback(
        handleInputChange(
            setPassword,
            setPasswordError,
            validateLogInPassword,
            () => {
                setMessage('');
            }
        ),
        []
    );

    useEffect(() => {
        if (id && password) {
            resetErrors(setIdError, setPasswordError);
        }
    }, []);

    useEffect(() => {
        const sessionStoragePassword = getSessionStorages(
            StorageKeyword.CHANGE_PASSWORD_SUCCESS
        );
        const sessionStorageVerification = getSessionStorages(
            StorageKeyword.VERIFICATION_SUCCESS
        );

        if (
            sessionStoragePassword &&
            sessionStoragePassword === StorageKeyword.TRUE
        ) {
            setToastMessage(ValidationMessages.CHANGE_PASSWORD_SUCCESS);
            setToast(true);
            deleteSessionStorage(StorageKeyword.CHANGE_PASSWORD_SUCCESS);
        }
        if (
            sessionStorageVerification &&
            sessionStorageVerification === StorageKeyword.TRUE
        ) {
            setToastMessage(ValidationMessages.SUCCESS_VERIFICATION);
            setToast(true);
            deleteSessionStorage(StorageKeyword.VERIFICATION_SUCCESS);
        }
    }, []);

    useEffect(() => {}, [message]);

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (idError || !id) {
                errorInputCheck(idInputRef.current);
                return;
            }

            if (passwordError || !password) {
                errorInputCheck(passwordInputRef.current);
                return;
            }

            if (id && password) {
                resetErrors(setIdError, setPasswordError);
                const userData: LogInRequestDTO = {
                    loginId: id,
                    password: password,
                };

                try {
                    await logIn(userData);
                    const userInfo = await getUserInfo();
                    if (userInfo) {
                        auth.login(() => {
                            navigate('/');
                        });
                    } else {
                        setMessage(ValidationMessages.GET_USER_INFO_FAIL);
                    }
                } catch (error) {
                    if (error === 40401) {
                        setMessage(ValidationMessages.NONEXIST_ID);
                        return;
                    }
                    if (error === 40102) {
                        setMessage(ValidationMessages.PASSWORD_MISMATCH);
                        return;
                    }
                    setMessage(ValidationMessages.UNKNOWN_ERROR);
                }
            }
        },
        [id, password, idError, passwordError, auth, navigate]
    );
    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    {idError ? (
                        <p className="error-message">{idError}</p>
                    ) : (
                        <p>{DEFAULT_ID}</p>
                    )}
                    <label htmlFor="id">{DEFAULT_ID}</label>
                    <input
                        ref={idInputRef}
                        className="c-login__input"
                        name="id"
                        id="id"
                        type="text"
                        placeholder={ValidationMessages.REQUIRED_ID}
                        value={id}
                        onChange={onChangeId}
                    />
                </div>
                <div className="c-login__section">
                    {passwordError ? (
                        <p className="error-message">{passwordError}</p>
                    ) : (
                        <p>{DEFAULT_PASSWORD}</p>
                    )}
                    <label htmlFor="password">{DEFAULT_PASSWORD}</label>
                    <input
                        autoComplete="on"
                        ref={passwordInputRef}
                        className="c-login__input"
                        name="password"
                        type="password"
                        id="password"
                        placeholder={ValidationMessages.REQUIRED_PASSWORD}
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                {message && (
                    <p className="c-login__message font-warning">{message}</p>
                )}
                <section className="c-login__button-section">
                    <button
                        className="button__rounded button__orange"
                        type="submit"
                    >
                        {t('DEFAULT_LOGIN')}
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="button__rounded button__light"
                        type="submit"
                    >
                        {t('DEFAULT_SIGNUP')}
                    </button>
                    <section className="c-login__button-section-center">
                        <button
                            className="button__light-font"
                            onClick={() => navigate('/id/verification')}
                        >
                            {t('FIND_ID')}
                        </button>
                        <button
                            className="button__light-font"
                            onClick={() => navigate('/find/password')}
                        >
                            {t('FIND_PASSWORD')}
                        </button>
                    </section>
                </section>
            </form>
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
        </div>
    );
}
