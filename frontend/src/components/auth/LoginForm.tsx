// frontend/src/components/auth/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch, RootState } from '../../store';
import { loginUser } from '../../features/auth/authSlice';
import { LoginCredentials } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';

// اسکیمای اعتبارسنجی فرم با Yup
const loginSchema = yup.object().shape({
  username: yup.string().required('نام کاربری الزامی است'),
  password: yup.string().required('رمز عبور الزامی است'),
});

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginCredentials) => {
    dispatch(loginUser(data)).then((action) => {
      // اگر لاگین موفقیت‌آمیز بود، کاربر را به داشبورد هدایت کن
      if (action.meta.requestStatus === 'fulfilled') {
        router.push('/dashboard');
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

      {/* نمایش خطای عمومی از بک‌اند */}
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      <Button type="submit" isLoading={status === 'loading'} className="w-full">
        ورود
      </Button>
    </form>
  );
};

export default LoginForm;