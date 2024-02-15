from django.shortcuts import render
from rest_framework import generics
from .serializer import RateSerializer, UsdToCzkSerializer
from .models import Rate, UsdToCzk
from rest_framework.permissions import BasePermission, IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser

# Create your views here.
class RateApi(generics.ListAPIView):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    permission_classes = [AllowAny]



class HideRate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    permission_classes = [IsAuthenticated, IsSuperUser]


class UsdToCzkView(generics.ListAPIView):
    queryset = UsdToCzk.objects.all()
    serializer_class = UsdToCzkSerializer
    permission_classes = [AllowAny]

class CreateRateApi(generics.CreateAPIView):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    permission_classes = [IsAuthenticated, IsSuperUser]