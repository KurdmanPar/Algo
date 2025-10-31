# backend/core/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

# یک روتر برای مدیریت ViewSet ایجاد می‌کنیم
router = DefaultRouter()
# ViewSet را به روتر ثبت می‌کنیم. DRF به طور خودکار مسیرها را ایجاد می‌کند.
# مثلاً برای اکشن login، مسیر api/users/login/ ساخته می‌شود.
router.register(r'users', UserViewSet, basename='user')

# URLهای اپلیکیشن core
urlpatterns = [
    path('', include(router.urls)),
]