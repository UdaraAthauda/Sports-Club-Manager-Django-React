from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import *
from .serializers import *


class CountryViewset(viewsets.ViewSet):
    permission_classes = [AllowAny]
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    
    def list(self, request):
        queryset = Country.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    

class LeagueViewset(viewsets.ViewSet):
    permission_classes = [AllowAny]
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    
    def list(self, request):
        queryset = League.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    

class CharacteristicViewset(viewsets.ViewSet):
    permission_classes = [AllowAny]
    queryset = Characteristic.objects.all()
    serializer_class = CharacteristicSerializer
    
    def list(self, request):
        queryset = Characteristic.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    
class FootBallClubViewset(viewsets.ViewSet):
    permission_classes = [AllowAny]
    queryset = FootBallClub.objects.all()
    serializer_class = FootBallClubSerializer
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)        