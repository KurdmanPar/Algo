# backend/core/views.py
from rest_framework import viewsets, permissions
from .models import User
from .serializers.user_serializer import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing User instances.
    Permissions are set to IsAuthenticated for now. You can customize this later.
    """
    queryset = User.objects.all() # داده‌هایی که این ViewSet با آن کار می‌کند
    serializer_class = UserSerializer # Serializer مربوطه
    permission_classes = [permissions.IsAuthenticated] # فقط کاربران وارد شده می‌تونن این APIها رو ببینن
    # permission_classes = [permissions.AllowAny] # برای تست اولیه می‌تونیم اینو فعال کنیم

    # نکته: عملیات create (POST /users/) با ModelViewSet انجام میشه،
    # اما برای کاربران جدید معمولاً Serializer خاصی (مثل SignUpSerializer) نیاز داریم
    # که رمز عبور رو درست هش کنه. اینجا فقط یک نمایش اولیه هست.

