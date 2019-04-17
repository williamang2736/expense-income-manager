from transactions.models import Expense, Income
from rest_framework import viewsets, permissions
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from .serializers import ExpenseSerializer, IncomeSerializer, BalanceSerializer
from django.db.models import Count, Sum


class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return self.request.user.expense_set.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class IncomeViewSet(viewsets.ModelViewSet):
    serializer_class = IncomeSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return self.request.user.income_set.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# need to update based on user
class BalanceViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        expense_sum = Expense.objects.all().aggregate(Sum("amount"))["amount__sum"]
        income_sum = Income.objects.all().aggregate(Sum("amount"))["amount__sum"]
        balance = 0
        if expense_sum and income_sum:
            balance = income_sum - expense_sum

        return Response(
            {
                "id": 1,  # temp
                "expense_sum": expense_sum if expense_sum else 0,
                "income_sum": income_sum if income_sum else 0,
                "balance": balance,
            }
        )
