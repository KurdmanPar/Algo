# backend/core/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom User Model.
    Extends Django's AbstractUser to allow for future customizations.
    Add any additional fields here if needed.
    Examples:
        phone_number = models.CharField(max_length=15, blank=True)
        profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    """
    # Example: Adding a phone number field (optional)
    # phone_number = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.username
