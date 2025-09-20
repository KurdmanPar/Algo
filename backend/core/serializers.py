# core/serializers.py
from rest_framework import serializers

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        # اعتبارسنجی ساده: بررسی وجود فیلد refresh
        # اعتبارسنجی عمیق‌تر (مانند بررسی فرمت توکن) توسط خود JWT انجام می‌شود.
        return attrs