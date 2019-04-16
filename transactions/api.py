from transactions.models import Expense, Income
from rest_framework import viewsets, permissions
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from .serializers import ExpenseSerializer, IncomeSerializer, BalanceSerializer
from django.db.models import Count, Sum


class ExpenseViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()


class IncomeViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = IncomeSerializer
    queryset = Income.objects.all()


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
