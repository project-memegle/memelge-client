import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import SignUp from '../pages/SignUp';
import ValidationMessages from '../components/Validations/ValidationMessages';

jest.mock('axios');

describe('회원가입 성공시', () => {
    beforeEach(() => {
        (axios.post as jest.Mock).mockImplementation(() =>
            Promise.resolve({ data: { message: 'success' } })
        );
    });

    it('회원가입 폼 렌더링 테스트', () => {
        render(<SignUp />);
        expect(screen.getByPlaceholderText('아이디')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('닉네임')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('비밀번호 확인')
        ).toBeInTheDocument();
    });

    it('사용자가 하나라도 입력하지 않았을 때', async () => {
        render(<SignUp />);
        fireEvent.click(screen.getByText('회원가입'));

        expect(
            await screen.findByText(ValidationMessages.REQUIRED_ID)
        ).toBeInTheDocument();
        expect(
            await screen.findByText(ValidationMessages.REQUIRED_PASSWORD)
        ).toBeInTheDocument();
        expect(
            await screen.findByText(ValidationMessages.REQUIRED_NICKNAME)
        ).toBeInTheDocument();
    });

    it('사용자가 아이디 입력하지 않았을 때', async () => {
        render(<SignUp />);
        fireEvent.change(screen.getByPlaceholderText('아이디'), {
            target: { value: '' },
        });
        fireEvent.change(screen.getByPlaceholderText('닉네임'), {
            target: { value: '' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
            target: { value: '' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), {
            target: { value: '' },
        });
        fireEvent.click(screen.getByText('회원가입'));
        expect(
            await screen.findByText(ValidationMessages.REQUIRED_ID)
        ).toBeInTheDocument();
    });

    it('사용자가 비밀번호 입력하지 않았을 때', async () => {
        render(<SignUp />);
        fireEvent.change(screen.getByPlaceholderText('아이디'), {
            target: { value: 'testid' },
        });
        fireEvent.change(screen.getByPlaceholderText('닉네임'), {
            target: { value: 'testnickname' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
            target: { value: '' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), {
            target: { value: '' },
        });
        fireEvent.click(screen.getByText('회원가입'));
        expect(
            await screen.findByText(ValidationMessages.REQUIRED_PASSWORD)
        ).toBeInTheDocument();
    });

    it('사용자가 닉네임 입력하지 않았을 때', async () => {
        render(<SignUp />);
        fireEvent.change(screen.getByPlaceholderText('아이디'), {
            target: { value: 'testid1' },
        });
        fireEvent.change(screen.getByPlaceholderText('닉네임'), {
            target: { value: '' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
            target: { value: 'testpassword1' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), {
            target: { value: 'testpassword1' },
        });
        fireEvent.click(screen.getByText('회원가입'));
        expect(
            await screen.findByText(ValidationMessages.REQUIRED_NICKNAME)
        ).toBeInTheDocument();
    });

    it('회원가입 성공 시 메시지 확인', async () => {
        const mockPost = axios.post as jest.Mock;
        mockPost.mockResolvedValue({
            data: { message: ValidationMessages.SIGNUP_SUCCESS },
        });

        render(<SignUp />);
        fireEvent.change(screen.getByPlaceholderText('아이디'), {
            target: { value: 'testid' },
        });
        fireEvent.change(screen.getByPlaceholderText('닉네임'), {
            target: { value: 'testnickname' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
            target: { value: 'testpassword' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), {
            target: { value: 'testpassword' },
        });
        fireEvent.click(screen.getByText('회원가입'));

        const message = await screen.findByText(
            ValidationMessages.SIGNUP_SUCCESS
        );
        expect(message).toBeInTheDocument();
    });
});

describe('회원가입 실패시', () => {
    it('회원가입 실패 시 메시지 확인', async () => {
        // Mock the API to return a 400 error with headers
        (axios.post as jest.Mock).mockRejectedValue({
            response: {
                status: 400,
                data: { message: 'Invalid request' },
                headers: {
                    'content-type': 'application/json',
                    'x-custom-header': 'custom-value',
                },
            },
        });

        render(<SignUp />);
        fireEvent.change(screen.getByPlaceholderText('아이디'), {
            target: { value: 'testid' },
        });
        fireEvent.change(screen.getByPlaceholderText('닉네임'), {
            target: { value: 'testnickname' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
            target: { value: 'testpassword' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), {
            target: { value: 'testpassword' },
        });
        fireEvent.click(screen.getByText('회원가입'));

        // Check if the correct error message is displayed
        const errorMessage = await screen.findByText('Invalid request');
        expect(errorMessage).toBeInTheDocument();
    });
});