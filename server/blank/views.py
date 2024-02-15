from django.shortcuts import render
from rest_framework import generics
from .models import Fo
from .serializer import FoSerializer, FoDetailSerializer
from rest_framework.permissions import BasePermission, IsAuthenticated
from adminsite.pagination import Pagination
from django.db.models import Q
from transaction.models import TransactionRequest
from transaction.serializer import TransactionSerializer


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser

# Create your views here.
class UserList(generics.ListAPIView):
    pagination_class = Pagination
    serializer_class = FoSerializer
    permission_classes = [IsAuthenticated, IsSuperUser]

    def get_queryset(self):
        queryset = Fo.objects.all()
        
        search = self.request.query_params.get('search')

        if search is not None:
            name_surname = search.split(' ')
            if len(name_surname) == 2:
                name, surname = name_surname
                queryset = queryset.filter(
                    Q(name__icontains=name, surname__icontains=surname) |
                    Q(surname__icontains=name, name__icontains=surname)
                )
            else:
                queryset = queryset.filter(
                    Q(name__icontains=search) |
                    Q(surname__icontains=search) |
                    Q(email__icontains=search) |
                    Q(telegram__icontains=search) |
                    Q(phone_number__icontains=search)
                )
            
        return queryset.order_by('-id')


class UserListDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fo.objects.all()
    serializer_class = FoDetailSerializer
    permission_classes = [IsAuthenticated, IsSuperUser]


class UserCreateUpdate(generics.CreateAPIView):
    queryset = Fo.objects.all()
    serializer_class = FoDetailSerializer
    permission_classes = [IsAuthenticated, IsSuperUser]


class UserTransaction(generics.ListAPIView):
    serializer_class = TransactionSerializer
    pagination_class = Pagination
    permission_classes = [IsAuthenticated, IsSuperUser]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        queryset = TransactionRequest.objects.filter(fo=user_id, processed=True)
        return queryset.order_by('-id')
