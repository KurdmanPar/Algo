# backend/core/serializers/user_serializer.py
from rest_framework import serializers
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
