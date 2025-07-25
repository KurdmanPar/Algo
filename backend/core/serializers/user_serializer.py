# backend/core/serializers/user_serializer.py
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from ..models import User # ایمپورت مدل User از پوشه والد (..)


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the custom User model.
    This serializer will handle converting User instances to/from JSON.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined', 'is_active']
        # fields = '__all__' # یا می‌تونیم همه فیلدها رو انتخاب کنیم، اما بهتره مشخص کنیم چیا لازمه.
        read_only_fields = ['id', 'date_joined'] # این فیلدها فقط خواندنی هستن و نباید از کلاینت بیاد.



# ------------------ Serializer مخصوص SignUp ------------------
class SignUpSerializer(serializers.ModelSerializer):
    """
    Serializer for creating a new user via signup.
    Handles password validation and hashing.
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirm')
        # fields = '__all__' # اینجا نمی‌خوایم همه فیلدها باشن

    def validate(self, attrs):
        """
        اعتبارسنجی سفارشی: بررسی یکسان بودن password و password_confirm
        """
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        """
        Override the create method to handle password hashing.
        """
        # حذف password_confirm چون در مدل User وجود نداره
        validated_data.pop('password_confirm')
        # گرفتن پسورد
        password = validated_data.pop('password')
        # ایجاد نمونه کاربر
        user = User(**validated_data)
        # هش کردن پسورد و ذخیره
        user.set_password(password) # این متد پسورد رو هش می‌کنه و ذخیره می‌کنه
        user.save()
        return user