import { FormEvent, useCallback, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import validateId from 'components/Validations/ValidateId';
import ValidationMessages from 'components/Validations/ValidationMessages';
import validateNickname from 'components/Validations/ValidateNickname';
import { SignUpDTO } from 'services/dto/SignUpDto';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import handleInputChange from 'utils/Event/handleInputChange';
import passwordCheckHandler from 'utils/SignUp/passwordCheckHandler';
import { post } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { signUp } from 'services/SignupService';
import { LogInRequestDTO } from 'services/dto/LogInDto';
import { logIn } from 'services/LogInService';
import { useAuth } from 'components/auth/ProvideAuth';
import { useLocation } from 'react-router-dom';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import StorageKeyword from 'Constant/StorageKeyword';

export default function SignUp() {
    const navigate = useCustomNavigate();
    const auth = useAuth();

    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;
    const DEFALUT_NICKNAME = ValidationMessages.DEFAULT_NICKNAME;
    const DEFAULT_PASSWORD = ValidationMessages.DEFAULT_PASSWORD;

    const [idError, setIdError] = useState(DEFAULT_ID);
    const [nicknameError, setNicknameError] = useState(DEFALUT_NICKNAME);
    const [passwordError, setPasswordError] = useState(DEFAULT_PASSWORD);

    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [signUpError, setSignUpError] = useState('');

    const idInputRef = useRef<HTMLInputElement>(null);
    const nicknameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const passwordCheckInputRef = useRef<HTMLInputElement>(null);

    const onChangeId = useCallback(
        handleInputChange(setId, setIdError, validateId, () =>
            setSignUpError('')
        ),
        []
    );

    const onChangeNickname = useCallback(
        handleInputChange(setNickname, setNicknameError, validateNickname),
        []
    );

    const onChangePassword = useCallback(
        passwordCheckHandler(setPassword, passwordCheck, setPasswordError),
        [passwordCheck]
    );

    const onChangePasswordCheck = useCallback(
        passwordCheckHandler(setPasswordCheck, password, setPasswordError),
        [password]
    );

    const onClickVerification = useCallback(
        async (e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault();

            if (idError) {
                errorInputCheck(idInputRef.current);
                return;
            }
            if (nicknameError) {
                errorInputCheck(nicknameInputRef.current);
                return;
            }
            if (passwordError) {
                errorInputCheck(passwordInputRef.current);
                return;
            }

            if (nickname && id && password && passwordCheck) {
                try {
                    const userData = {
                        loginId: id,
                        nickname: nickname,
                        password: password,
                    };

                    const response = await signUp(userData);
                    // 회원가입 후 자동 로그인
                    const loginData: LogInRequestDTO = {
                        loginId: id,
                        password: password,
                    };
                    await logIn(loginData);

                    auth.login(() => {
                        navigate('/signup/verification', { state: loginData });
                    });
                } catch (error) {
                    handleApiError(error, setSignUpError);
                }
            }
        },
        [
            id,
            password,
            nickname,
            idError,
            nicknameError,
            passwordError,
            signUpError,
            navigate,
        ]
    );

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (idError) {
                errorInputCheck(idInputRef.current);
                return;
            }
            if (nicknameError) {
                errorInputCheck(nicknameInputRef.current);
                return;
            }
            if (passwordError) {
                errorInputCheck(passwordInputRef.current);
                return;
            }

            if (nickname && id && password && passwordCheck) {
                const userData: SignUpDTO = {
                    loginId: id,
                    nickname: nickname,
                    password: password,
                };
                try {
                    const response = await signUp(userData);
                    // 회원가입 후 자동 로그인
                    const loginData: LogInRequestDTO = {
                        loginId: id,
                        password: password,
                    };
                    await logIn(loginData);

                    setSessionStorages({
                        key: StorageKeyword.CREATE_ACCOUNT_SUCCESS,
                        value: StorageKeyword.TRUE,
                    });

                    // 로그인 상태를 업데이트하고 홈 페이지로 리다이렉트
                    auth.login(() => {
                        navigate('/');
                    });
                } catch (error) {
                    handleApiError(error, setSignUpError);
                }
            }
        },
        [
            id,
            nickname,
            password,
            passwordCheck,
            idError,
            passwordError,
            nicknameError,
            signUpError,
        ]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    <p>{idError ? idError : DEFAULT_ID}</p>
                    <label htmlFor="id">아이디</label>
                    <input
                        ref={idInputRef}
                        className="c-login__input"
                        name="id"
                        id="id"
                        type="text"
                        placeholder="아이디"
                        value={id}
                        onChange={onChangeId}
                    />
                </div>
                <div className="c-login__section">
                    <p>{nicknameError ? nicknameError : DEFALUT_NICKNAME}</p>
                    <label htmlFor="nickname">닉네임</label>
                    <input
                        ref={nicknameInputRef}
                        className="c-login__input"
                        name="nickname"
                        id="nickname"
                        type="text"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={onChangeNickname}
                    />
                </div>
                <div className="c-login__section">
                    <p>{passwordError ? passwordError : DEFAULT_PASSWORD}</p>
                    <section className="c-login__section-password">
                        <div>
                            <label htmlFor="password">비밀번호</label>
                            <input
                                ref={passwordInputRef}
                                className="c-login__input"
                                name="password"
                                type="password"
                                id="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={onChangePassword}
                            />
                        </div>
                        <div>
                            <label htmlFor="password-check">
                                비밀번호 확인
                            </label>
                            <input
                                ref={passwordCheckInputRef}
                                className="c-login__input"
                                name="password-check"
                                type="password"
                                id="password-check"
                                placeholder="비밀번호 확인"
                                value={passwordCheck}
                                onChange={onChangePasswordCheck}
                            />
                        </div>
                    </section>
                </div>
                {signUpError && <p className="message">{signUpError}</p>}
                <section className="c-login__button-section">
                    <div className="c-login__button-section-message">
                        <p>
                            본인 인증을 완료한 회원만이 아이디 및 비밀번호 찾기
                            서비스를 이용할 수 있습니다.
                        </p>
                        <p>본인 인증 없이도 회원 가입이 가능합니다.</p>
                    </div>
                    <button
                        className="button__rounded button__orange"
                        type="button"
                        onClick={onClickVerification}
                    >
                        본인인증
                    </button>
                    <button className="button__rounded button__light">
                        회원가입
                    </button>
                </section>
            </form>
        </div>
    );
}
