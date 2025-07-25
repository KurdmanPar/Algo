# backend/core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, signup

# ایجاد یک نمونه از DefaultRouter
router = DefaultRouter()

# ثبت ViewSet در روتر
# آرگومان اول: پیشوند URL (مثلاً 'users' برای /users/)
# آرگومان دوم: ViewSet مربوطه
# آرگومان سوم (اختیاری): اسم پیش‌فرض برای URL patternها
router.register(r'users', UserViewSet, basename='user')

# تعریف urlpatterns برای این App
# include(router.urls) تمام URLهای ایجاد شده توسط روتر را اضافه می‌کند.
urlpatterns = [
    path('', include(router.urls)),
    # Endpoint مخصوص SignUp
    path('signup/', signup, name='user-signup'),
]
