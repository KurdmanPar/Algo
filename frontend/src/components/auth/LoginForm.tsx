// frontend/src/components/auth/LoginForm.tsx
'use client'; // این کامپوننت باید سمت کلاینت رندر شود

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation'; // <-- تغییر import
import { AppDispatch, RootState } from '../../store';
import { loginUser } from '../../features/auth/authSlice';
import { LoginCredentials } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';

const loginSchema = yup.object().shape({
  username: yup.string().required('نام کاربری الزامی است'),
  password: yup.string().required('رمز عبور الزامی است'),
});

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter(); // هوک جدید
  const searchParams = useSearchParams(); // برای خواندن پارامترهای URL
  const { status, error } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginCredentials) => {
    dispatch(loginUser(data)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        // اگر پارامتر redirect در URL وجود داشت، کاربر را به آنجا بفرست
        const redirectUrl = searchParams.get('redirect') || '/dashboard';
        router.push(redirectUrl);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="نام کاربری"
        {...register('username')}
        error={errors.username?.message}
      />
      <Input
        label="رمز عبور"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      <Button type="submit" isLoading={status === 'loading'} className="w-full">
        ورود
      </Button>
    </form>
  );
};

export default LoginForm;