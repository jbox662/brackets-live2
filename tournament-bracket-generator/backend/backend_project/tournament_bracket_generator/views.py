# from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from .models import Player, Fixture, GroupStage, RegistrationStatus
from .serializers import PlayerSerializer, CreatePlayerSerializer, FixtureSerializer, GroupStageSerializer, CreateFeedbackSerializer, RegistrationStatusSerializer

class PlayerDetailsView(generics.ListAPIView):
    serializer_class = FixtureSerializer

    def get_queryset(self):
        player = get_object_or_404(Player, id=self.kwargs['id'])
        return Fixture.objects.filter(Q(player=player) | Q(opponent=player))

class PlayerView(generics.ListAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class CreatePlayerView(APIView):
    serializer_class = CreatePlayerSerializer

    def post(self, request):
        nick_name = request.data.get('nick_name')

        # if get_object_or_404(Player, nick_name=nick_name):
        #     return Response({'message': f'{nick_name} is already registered'}, status=400)

        try:
            Player.objects.get(nick_name=nick_name)
            return Response({'message': 'Player with this nickname is already registered'}, status=400)
        except ObjectDoesNotExist:
            pass
        
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = 201)
        return Response(serializer.errors, status = 400)
    
class FixtureView(generics.ListAPIView):
    queryset = Fixture.objects.all().order_by('match_number')
    serializer_class = FixtureSerializer

class GroupStageView(generics.ListAPIView):
    queryset = GroupStage.objects.all().order_by('-points', '-goals_difference')
    serializer_class = GroupStageSerializer

class CreateFeedbackView(APIView):
    serializer_class = CreateFeedbackSerializer

    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = 201)
        return Response(serializer.errors, status = 400)

class RegistrationStatusView(generics.ListAPIView):
    queryset = RegistrationStatus.objects.all()
    serializer_class = RegistrationStatusSerializer