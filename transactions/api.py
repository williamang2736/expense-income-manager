from transactions.models import Expense, Income
from rest_framework import viewsets, permissions
from .serializers import ExpenseSerializer, IncomeSerializer

# Expense Viewset
class ExpenseViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]

    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()


class IncomeViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]

    serializer_class = IncomeSerializer
    queryset = Income.objects.all()
