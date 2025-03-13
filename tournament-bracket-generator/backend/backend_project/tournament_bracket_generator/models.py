from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.db.models import Q

# Create your models here.
class Player(models.Model):
  first_name = models.CharField(max_length=30, verbose_name="first name")
  last_name = models.CharField(max_length=30, verbose_name="last name")
  nick_name = models.CharField(max_length=30, unique=True, verbose_name="nickname")
  added_to_teams_chat = models.BooleanField(default=False, verbose_name="added to Teams chat")
  registration_date = models.DateTimeField(default=timezone.now, editable=False, verbose_name="registration date")

  def __str__(self):
    return f"{self.first_name} {self.last_name}"
  
class GroupStage(models.Model):
  GROUP_NAMES = [
    ('A', 'Group A'),
    ('B', 'Group B'),
    ('C', 'Group C'),
    ('D', 'Group D'),
  ]

  player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='group_player', verbose_name='player')
  group_name = models.CharField(max_length=1, choices=GROUP_NAMES, verbose_name='group name')
  matches_played = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(3)], verbose_name='matches played')
  wins = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(3)], verbose_name='wins')
  draws = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(3)], verbose_name='draws')
  loses = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(3)], verbose_name='loses')
  goals_for = models.IntegerField(default=0, validators=[MinValueValidator(0)], verbose_name='goals for')
  goals_against = models.IntegerField(default=0, validators=[MinValueValidator(0)], verbose_name='goals against')
  goals_difference = models.IntegerField(default=0, verbose_name='goals difference')
  points = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(9)], verbose_name='points')
  qualified = models.BooleanField(verbose_name='qualified')

  def __str__(self):
    return f"Group: {self.group_name} - {self.player}"
  
  def save(self, *args, **kwargs):
    # Check if the instance is being created or updated
    is_created = self.pk is None
    old_group_name = None

    if not is_created:
      old_group_name = GroupStage.objects.get(pk=self.pk).group_name

    super(GroupStage, self).save(*args, **kwargs)

    # Delete old fixtures if the group has changed
    if old_group_name and old_group_name != self.group_name:
      Fixture.objects.filter(Q(player=self.player) | Q(opponent=self.player), group=old_group_name).delete()

    self.create_group_stage_fixture()
    
    # Create Knockout Fixtures - Not working when e.g., final match removed
    knockout_stages = ['QF', 'SF', '3P', 'F']
    fixtures = Fixture.objects.filter(stage__in=knockout_stages)
    if not fixtures.exists():
      self.create_knockout_stage_fixture()


  def create_group_stage_fixture(self):
    other_players = GroupStage.objects.filter(group_name=self.group_name).exclude(pk=self.pk)

    for other_player in other_players:
      players_tuple = tuple(sorted([self.player.id, other_player.player.id]))

      if not Fixture.objects.filter(player_id=players_tuple[0], opponent_id=players_tuple[1]).exists():
        Fixture.objects.create(player_id=players_tuple[0], opponent_id=players_tuple[1], stage='G', group=self.group_name)

  # You should check if the Knockout Stages exists to not create duplicated instances
  def create_knockout_stage_fixture(self):
    print('create_knockout_stage_fixture')
    Fixture.objects.create(player=Player.objects.get(first_name='Ivan', last_name='Rodriguez'), opponent=Player.objects.get(first_name='Heidi', last_name='Garcia'), stage='QF')
    Fixture.objects.create(player=Player.objects.get(first_name='Grace', last_name='Davis'), opponent=Player.objects.get(first_name='Frank', last_name='Miller'), stage='QF')
    Fixture.objects.create(player=Player.objects.get(first_name='Eve', last_name='Jones'), opponent=Player.objects.get(first_name='David', last_name='Brown'), stage='QF')
    Fixture.objects.create(player=Player.objects.get(first_name='Charlie', last_name='Williams'), opponent=Player.objects.get(first_name='Bob', last_name='Johnson'), stage='QF')

    Fixture.objects.create(player=Player.objects.get(first_name='Alice', last_name='Smith'), opponent=Player.objects.get(first_name='Brad', last_name='Pitt'), stage='SF')
    Fixture.objects.create(player=Player.objects.get(first_name='Frank', last_name='Ocean'), opponent=Player.objects.get(first_name='Joey', last_name='Nurmageev'), stage='SF')
    Fixture.objects.create(player=Player.objects.get(first_name='Morty', last_name='Ricky'), opponent=Player.objects.get(first_name='Rick', last_name='Dolley'), stage='3P')
    Fixture.objects.create(player=Player.objects.get(first_name='Jane', last_name='Doe'), opponent=Player.objects.get(first_name='John', last_name='Doe'), stage='F')

class Fixture(models.Model):
  LEVELS = [
    ('G', 'Group'),
    ('QF', 'Quarter-final'),
    ('SF', 'Semi-final'),
    ('3P', '3rd place'),
    ('F', 'Final'),
  ]

  MATCH_STATUS = [
    ('NS', 'Not Started'),
    ('IP', 'In Progress'),
    ('CO', 'Completed'),
  ]

  group = models.CharField(max_length=1, choices=GroupStage.GROUP_NAMES, null=True, verbose_name='group name')
  player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='fixture_player', verbose_name='player name')
  opponent = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='fixture_opponent', verbose_name='opponent name')
  player_goals_1st_leg = models.IntegerField(default=None, blank=True, null=True, validators=[MinValueValidator(0)], verbose_name='player goals 1st leg')
  opponent_goals_1st_leg = models.IntegerField(default=None, blank=True, null=True, validators=[MinValueValidator(0)], verbose_name='opponent goals 1st leg')
  player_goals_2nd_leg = models.IntegerField(default=None, blank=True, null=True, validators=[MinValueValidator(0)], verbose_name='player goals 2nd leg')
  opponent_goals_2nd_leg = models.IntegerField(default=None, blank=True, null=True, validators=[MinValueValidator(0)], verbose_name='opponent goals 2nd leg')
  stage = models.CharField(max_length=2, choices=LEVELS, verbose_name='stage')
  status = models.CharField(max_length=2, choices=MATCH_STATUS, default='NS', verbose_name='status')
  match_number = models.IntegerField(unique=True, null=True, verbose_name='match number')

  def __str__(self):
    return f"{self.player.first_name} {self.player.last_name} - {self.opponent.first_name} {self.opponent.last_name}"

  def clean(self):
    if self.status == 'NS' and (self.player_goals_1st_leg is not None or self.opponent_goals_1st_leg is not None):
      raise ValidationError("Scores must be None for a match that has Not Started.")
    elif self.status in ['IP', 'CO'] and (self.player_goals_1st_leg is None or self.opponent_goals_1st_leg is None):
      raise ValidationError("Scores mustn't be None for a match In Progress or Completed.")
    
    super().clean()

  def save(self, *args, **kwargs):
    is_created = self.pk is None
    old_player_goals_for = None
    old_opponent_goals_for = None

    if not is_created:
      old_match = Fixture.objects.get(pk=self.pk)
      old_player_goals_for = old_match.player_goals_1st_leg or 0
      old_opponent_goals_for = old_match.opponent_goals_1st_leg or 0
      old_status = old_match.status

    super().save(*args, **kwargs)

    knockout_game_exists = Fixture.objects.filter(stage__in=['QF', 'SF', '3P', 'F']).exists()
    if knockout_game_exists:
      knockout_game = Fixture.objects.get(pk=self.pk)
      print('knockout_game: ', knockout_game)

    if self.stage == 'G' and not is_created:
      player_record = GroupStage.objects.get(group_name=self.group, player=self.player)
      opponent_record = GroupStage.objects.get(group_name=self.group, player=self.opponent)

      # Matches Played
      if (old_status == 'NS' and (self.status in ['IP', 'CO'])):
        player_record.matches_played += 1
        opponent_record.matches_played += 1

      if ((old_status in ['IP', 'CO']) and self.status == 'NS'):
        player_record.matches_played -= 1
        opponent_record.matches_played -= 1

      player_goals_1st_leg = self.player_goals_1st_leg or 0
      opponent_goals_1st_leg = self.opponent_goals_1st_leg or 0

      # Goals For
      player_record.goals_for = player_record.goals_for - old_player_goals_for + player_goals_1st_leg
      opponent_record.goals_for = opponent_record.goals_for - old_opponent_goals_for + opponent_goals_1st_leg

      # Goals Against
      player_record.goals_against = player_record.goals_against - old_opponent_goals_for + opponent_goals_1st_leg
      opponent_record.goals_against = opponent_record.goals_against - old_player_goals_for + player_goals_1st_leg

      # Goals Difference
      player_record.goals_difference = player_record.goals_for - player_record.goals_against
      opponent_record.goals_difference = opponent_record.goals_for - opponent_record.goals_against

      # Wins | Draws | Loses | Points
      if ((old_status in ['IP', 'CO']) and self.status == 'NS'):
        if old_player_goals_for > old_opponent_goals_for:
          if player_record.wins > 0:
            player_record.wins -= 1
          if player_record.points > 0:
            player_record.points -= 3
          if opponent_record.loses > 0:
            opponent_record.loses -= 1
        elif old_player_goals_for < old_opponent_goals_for:
          if opponent_record.wins > 0:
            opponent_record.wins -= 1
          if opponent_record.points > 0:
            opponent_record.points -= 3
          if player_record.loses > 0:
            player_record.loses -= 1
        else:
          if player_record.draws > 0:
            player_record.draws -= 1
          if player_record.points > 0:
            player_record.points -= 1
          if opponent_record.draws > 0:
            opponent_record.draws -= 1
          if opponent_record.points > 0:
            opponent_record.points -= 1

      if (old_status == 'NS' and (self.status in ['IP', 'CO'])):
        if self.player_goals_1st_leg > self.opponent_goals_1st_leg:
          player_record.wins += 1
          player_record.points += 3

          opponent_record.loses += 1
        elif self.player_goals_1st_leg > self.opponent_goals_1st_leg:
          opponent_record.wins += 1
          opponent_record.points += 3

          player_record.loses += 1
        else:
          player_record.draws += 1
          player_record.points += 1

          opponent_record.draws += 1
          opponent_record.points += 1

      player_record.save()
      opponent_record.save()

class Feedback(models.Model):
  rate = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], verbose_name='rate')
  comment = models.TextField(max_length=500, verbose_name='comment')

  def __str__(self):
    return f"Rate: {self.rate}"
  
class RegistrationStatus(models.Model):
  status = models.BooleanField(verbose_name='status')

  class Meta:
    verbose_name_plural = 'Registration Status'

  def __str__(self):
    return f"Registration Opened: {self.status}"