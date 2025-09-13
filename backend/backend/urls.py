"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


# backend/backend/urls.py
from django.contrib import admin
from django.urls import path, include  # include() را برای شامل کردن URLهای App 'core' زیر پیشوند 'api/' استفاده می‌کنیم.
from rest_framework_simplejwt.views import (
            TokenObtainPairView,
            TokenRefreshView,
        )

urlpatterns = [
    path('admin/', admin.site.urls),
    # شامل کردن URLهای App 'core' زیر پیشوند 'api/'
    # هر URL که با '/api/' شروع شود، به App 'core' فرستاده می‌شود.
    path('api/', include('core.urls')),
    # اضافه کردن URLهای JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]



