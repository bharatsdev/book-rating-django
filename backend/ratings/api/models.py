from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import Model
from django.utils import timezone


class Author(Model):
    name = models.CharField(max_length=100)
    age = models.CharField(max_length=100)
    joinedAt = models.DateField(default=timezone.now, null=True)

    class Meta:
        db_table = "Author"


class Book(Model):
    name = models.CharField(max_length=100)
    isbn = models.IntegerField()
    author = models.CharField(max_length=100)

    # models.ForeignKey(Author, on_delete=models.CASCADE)

    # published = models.DateTimeField(default=timezone.now, null=True)

    def no_of_ratings(self):
        ratings = Rating.objects.filter(movie=self)
        print("[INFO] : Movie " + self.name)
        print("[INFO] : Ratings " + len(ratings))

        return len(ratings)

    def avg_rating(self):
        ratings = Rating.objects.filter(movie=self)
        print("[INFO] : Movie " + self.name.name)
        print("[INFO] : Ratings " + len(ratings))
        ratings_sum = 0
        for r in ratings:
            ratings_sum += r.stars

        return 0 if len(ratings) <= 0 else ratings_sum / len(ratings)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "Books"


class Rating(Model):
    stars = models.IntegerField(validators=[MaxValueValidator(5), MinValueValidator(1)])
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        return self.stars

    class Meta:
        db_table = "Rating"
        unique_together = ('user', 'book',)
        index_together = ('user', 'book',)
