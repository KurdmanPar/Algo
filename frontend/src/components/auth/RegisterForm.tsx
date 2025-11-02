'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '../../store';
import { registerUser, clearError } from '../../features/auth/authSlice';
import { RegisterCredentials } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useEffect, useState } from 'react';

const registerSchema = yup.object().shape({
  username: yup.string().required('نام کاربری الزامی است').min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد'),
  email: yup.string().required('ایمیل الزامی است').email('ایمیل معتبر نیست'),
  password: yup.string().required('رمز عبور الزامی است').min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
});

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { status, error } = useSelector((state: RootState) => state.auth);
  const [apiErrors, setApiErrors] = useState<any>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterCredentials>({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, error]);

  const onSubmit = (data: RegisterCredentials) => {
    const action = dispatch(registerUser(data));

    action.then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        setApiErrors(null);
        router.push('/dashboard');
      } else {
        if (result.payload) {
          setApiErrors(result.payload);
        }
      }
    });
  };

  const renderApiErrors = () => {
    if (!apiErrors || typeof apiErrors !== 'object') return null;

    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">خطا در ثبت‌نام:</strong>
        <ul className="list-disc list-inside mt-2">
          {Object.entries(apiErrors).map(([field, messages]) => (
            <li key={field}>
              {Array.isArray(messages) ? messages.join(', ') : messages}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input label="نام کاربری" {...register('username')} error={errors.username?.message} />
      <Input label="ایمیل" type="email" {...register('email')} error={errors.email?.message} />
      <Input label="رمز عبور" type="password" {...register('password')} error={errors.password?.message} />

      {renderApiErrors()}

      <Button type="submit" isLoading={status === 'loading'} className="w-full">
        ثبت‌نام
      </Button>
    </form>
  );
};

export default RegisterForm;