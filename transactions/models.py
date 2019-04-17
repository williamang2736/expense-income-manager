from django.db import models
from django.contrib.auth.models import User


class Transaction(models.Model):
    name = models.CharField(max_length=100)
    amount = models.DecimalField(decimal_places=2, max_digits=14)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    class Meta:
        abstract = True


class Expense(Transaction):
    pass


class Income(Transaction):
    pass
