// frontend/src/components/auth/RegisterForm.tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch, RootState } from '../../store';
import { registerUser } from '../../features/auth/authSlice';
import { RegisterCredentials } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';

// اسکیمای اعتبارسنجی فرم با Yup
const registerSchema = yup.object().shape({
  username: yup.string().required('نام کاربری الزامی است').min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد'),
  email: yup.string().required('ایمیل الزامی است').email('ایمیل معتبر نیست'),
  password: yup.string().required('رمز عبور الزامی است').min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
});

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterCredentials>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterCredentials) => {
    dispatch(registerUser(data)).then((action) => {
      // اگر ثبت‌نام موفقیت‌آمیز بود، کاربر را به داشبورد هدایت کن
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
        label="ایمیل"
        type="email"
        {...register('email')}
        error={errors.email?.message}
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
        ثبت‌نام
      </Button>
    </form>
  );
};

export default RegisterForm;