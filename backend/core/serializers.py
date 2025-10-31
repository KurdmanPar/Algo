# backend/core/serializers.py

from rest_framework import serializers
from django.contrib.auth import authenticate
# این خط را حذف کنید: from django.contrib.auth.models import User
from .models import Profile, User # <-- این خط را اضافه کنید

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('bio', 'location', 'birth_date')

class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        # یک پروفایل خالی برای کاربر جدید ایجاد می‌کنیم
        Profile.objects.create(user=user)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('نام کاربری یا رمز عبور اشتباه است.')
            if not user.is_active:
                raise serializers.ValidationError('حساب کاربری شما غیرفعال شده است.')
            data['user'] = user
            return data
        else:
            raise serializers.ValidationError('نام کاربری و رمز عبور باید وارد شوند.')