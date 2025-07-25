# backend/core/views.py
from rest_framework import viewsets, permissions, status # <-- status را اضافه کنید
from rest_framework.response import Response # <-- Response را اضافه کنید
from rest_framework.decorators import api_view, permission_classes # <-- اینها را اضافه کنید
from rest_framework.permissions import AllowAny # <-- AllowAny را اضافه کنید
from .models import User
from .serializers.user_serializer import UserSerializer, SignUpSerializer # <-- SignUpSerializer را اضافه کنید


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



# ------------------ View مخصوص SignUp ------------------
@api_view(['POST'])
@permission_classes([AllowAny]) # هر کسی می‌تونه ثبت‌نام کنه
def signup(request):
    """
    API endpoint for user registration (sign up).
    """
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        # می‌تونیم یک پیام موفقیت یا حتی اطلاعات کاربر (بدون پسورد) رو برگردونیم
        return Response({
            "message": "User created successfully",
            "user": UserSerializer(user).data # برگرداندن اطلاعات کاربر با Serializer اصلی
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)