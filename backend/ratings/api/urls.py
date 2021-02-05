from django.urls import path, include
from rest_framework import routers

from .views import BookViewSet, RatingViewSet, UserViewSet

route = routers.DefaultRouter()
route.register("user", UserViewSet)
route.register("book", BookViewSet)
route.register("rating", RatingViewSet)

urlpatterns = [
    path('', include(route.urls)),
]
