from rest_framework import serializers
from .models import Player, Fixture, GroupStage, Feedback, RegistrationStatus

class PlayerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Player
    fields = ('id', 'first_name', 'last_name', 'nick_name')

class CreatePlayerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Player
    fields = ('first_name', 'last_name', 'nick_name')

class FixtureSerializer(serializers.ModelSerializer):
  player = serializers.StringRelatedField()
  opponent = serializers.StringRelatedField()
  
  class Meta:
    model = Fixture
    fields = ('match_number', 'player', 'opponent', 'player_goals_1st_leg', 'opponent_goals_1st_leg', 'player_goals_2nd_leg', 'opponent_goals_2nd_leg', 'group', 'stage', 'status')

class GroupStageSerializer(serializers.ModelSerializer):
  player = PlayerSerializer()

  class Meta:
    model = GroupStage
    fields = ('player', 'group_name', 'matches_played', 'wins', 'draws', 'loses', 'goals_for', 'goals_against', 'goals_difference', 'points', 'qualified')

  def to_representation(self, instance):
    representation = super().to_representation(instance)
    return {representation['group_name']: representation}
  
class CreateFeedbackSerializer(serializers.ModelSerializer):
  class Meta:
    model = Feedback
    fields = ('rate', 'comment')

class RegistrationStatusSerializer(serializers.ModelSerializer):
  class Meta:
    model = RegistrationStatus
    fields = '__all__'