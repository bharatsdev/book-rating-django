from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User

from .models import Book, Rating
from .serializers import BookSerializer, RatingsSerializer, UserSerializers


class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(methods=['POST'], detail=True)
    def rate_book(self, req, pk):
        print("[INFO] : rate book...")
        book = Book.objects.get(id=pk)
        user = req.user
        stars = req.data['stars']

        if 'stars' in req.data:
            try:
                rating = Rating.objects.get(user=user.id, book=book.id)
                print("update ratings..")
                rating.stars = stars
                rating.save()
                serializer = RatingsSerializer(rating, many=False)
                content = {
                    "message": "Ratings updated...!",
                    "ratings": serializer
                }
                return Response(content, status=status.HTTP_200_OK)
            except:
                rating = Rating.objects.create(user=user, book=book, stars=stars)
                serializer = RatingsSerializer(rating, many=False)
                content = {
                    "message": "Ratings Created...!",
                    "ratings": serializer
                }
                return Response(content, status=status.HTTP_200_OK)
        else:
            content = {'message': "You need to provide the stars"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class RatingViewSet(ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingsSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = (AllowAny,)
