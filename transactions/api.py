from transactions.models import Expense, Income
from rest_framework import viewsets, permissions
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from .serializers import ExpenseSerializer, IncomeSerializer, BalanceSerializer
from django.db.models import Count, Sum


class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        sortBy = self.request.query_params.get("sort")
        if sortBy:
            queryset = self.request.user.expense_set.order_by(sortBy)
        else:
            queryset = self.request.user.expense_set.all()

        return queryset


class IncomeViewSet(viewsets.ModelViewSet):
    serializer_class = IncomeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        sortBy = self.request.query_params.get("sort")
        if sortBy:
            queryset = self.request.user.income_set.order_by(sortBy)
        else:
            queryset = self.request.user.income_set.all()

        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BalanceViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        expense_sum = self.request.user.expense_set.all().aggregate(Sum("amount"))[
            "amount__sum"
        ]
        income_sum = self.request.user.income_set.all().aggregate(Sum("amount"))[
            "amount__sum"
        ]
        balance = 0
        if expense_sum and income_sum:
            balance = income_sum - expense_sum

        return Response(
            {
                "id": self.request.user.id,
                "expense_sum": expense_sum if expense_sum else 0,
                "income_sum": income_sum if income_sum else 0,
                "balance": balance,
            }
        )
