from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('country', CountryViewset, basename="country")
router.register('league', LeagueViewset, basename="league")
router.register('characteristic', CharacteristicViewset, basename="characteristic")

urlpatterns = router.urls
