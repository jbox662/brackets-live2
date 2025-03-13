from django.urls import path
from .views import PlayerDetailsView, PlayerView, CreatePlayerView, FixtureView, GroupStageView, CreateFeedbackView, RegistrationStatusView

urlpatterns = [
  path('players/', PlayerView.as_view()),
  path('create-player/', CreatePlayerView.as_view()),
  path('fixtures/', FixtureView.as_view()),
  path('group-stages/', GroupStageView.as_view()),
  path('feedback/', CreateFeedbackView.as_view()),
  path('registration-status/', RegistrationStatusView.as_view()),
  path('player-details/<int:id>/', PlayerDetailsView.as_view()),
]