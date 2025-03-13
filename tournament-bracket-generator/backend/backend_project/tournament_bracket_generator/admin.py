from django.contrib import admin, messages
from django.http import HttpResponse
import csv
from .models import Player, Feedback, Fixture, GroupStage, RegistrationStatus

class PlayerAdmin(admin.ModelAdmin):
  def export_as_csv(self, request, queryset):
      field_names = ['first_name', 'last_name', 'nick_name']

      field_name_mapping = {
        'first_name': 'First Name',
        'last_name': 'Last Name',
        'nick_name': 'Nickname',
      }

      response = HttpResponse(
        content_type="text/csv",
        headers={'Content-Disposition': 'attachment; filename=tournament_players.csv'}
      )
      writer = csv.writer(response)

      writer.writerow([field_name_mapping.get(field, field) for field in field_names])
      for obj in queryset:
          writer.writerow([getattr(obj, field) for field in field_names])

      return response

  export_as_csv.short_description = "Export Selected"

  list_display = ('first_name', 'last_name', 'nick_name', 'added_to_teams_chat', 'registration_date')
  list_filter = ('added_to_teams_chat',)
  search_fields = ('first_name', 'last_name', 'nick_name')
  readonly_fields = ('registration_date',)
  actions = ["export_as_csv"]
  ordering = ('-registration_date',)

class FeedbackAdmin(admin.ModelAdmin):
  list_display = ('rate', 'comment')
  list_filter = ('rate',)

class FixtureAdmin(admin.ModelAdmin):
  list_display = ('match_number', 'player', 'opponent', 'player_goals_1st_leg', 'opponent_goals_1st_leg', 'player_goals_2nd_leg', 'opponent_goals_2nd_leg', 'stage', 'group', 'status')
  list_filter = ('stage', 'group', 'status', 'player', 'opponent')
  search_fields = ('player__first_name', 'player__last_name', 'opponent__first_name', 'opponent__last_name', 'match_number')
  fields = ['match_number', 'stage', 'group', ('player', 'player_goals_1st_leg', 'player_goals_2nd_leg'), ('opponent', 'opponent_goals_1st_leg', 'opponent_goals_2nd_leg'), 'status']

  def get_fields(self, request, obj=None):
    fields = super().get_fields(request, obj)

    if obj and obj.stage == 'G':
      fields = ['match_number', 'stage', 'group', ('player', 'player_goals_1st_leg'), ('opponent', 'opponent_goals_1st_leg'), 'status']
      
    return fields

class GroupStageAdmin(admin.ModelAdmin):
  list_display = ('player', 'group_name', 'matches_played', 'wins', 'draws', 'loses', 'goals_for', 'goals_against', 'goals_difference', 'points', 'qualified')
  list_filter = ('group_name', 'qualified')
  search_fields = ('player__first_name', 'player__last_name')
  fields = ['group_name', 'player', 'matches_played', ('wins', 'draws', 'loses'), ('goals_for', 'goals_against', 'goals_difference'), 'points', 'qualified']

  def save_model(self, request, obj, form, change):
    if GroupStage.objects.filter(group_name=obj.group_name).exclude(id=obj.id).count() >= 4:
      messages.set_level(request, messages.ERROR)
      messages.error(request, "Group {group_name} already has 4 players. Can't assign more players to this group.")
      return
    
    if GroupStage.objects.filter(player=obj.player).exclude(id=obj.id).exists():
      messages.set_level(request, messages.ERROR)
      messages.error(request, "Player {obj.player} is already assigned to a group. Can't assign this player to more than one group.")
      return

    super().save_model(request, obj, form, change)

  # def formfield_for_foreignkey(self, db_field, request, **kwargs):
  #   if db_field.name == 'player':
  #     # kwargs['queryset'] = Player.objects.filter(first_name=request.first_name, last_name=request.last_name)
  #     kwargs['queryset'] = Player.objects.filter(group_player__isnull=True)
  #   return super().formfield_for_foreignkey(db_field, request, **kwargs)
  
  # def has_add_permission(self, request):
  #   if self.model.objects.count() >= Player.objects.all().count():
  #     return False
  #   return super().has_add_permission(request)

class RegistrationStatusAdmin(admin.ModelAdmin):
  MAX_COUNT = 1
  
  def has_add_permission(self, request):
    if self.model.objects.count() >= self.MAX_COUNT:
      return False
    return super().has_add_permission(request)

# Register your models here.
admin.site.register(Player, PlayerAdmin)
admin.site.register(Feedback, FeedbackAdmin)
admin.site.register(Fixture, FixtureAdmin)
admin.site.register(GroupStage, GroupStageAdmin)
admin.site.register(RegistrationStatus, RegistrationStatusAdmin)