from rest_framework import serializers
from transactions.models import Expense, Income


class ExpenseSerializer(serializers.ModelSerializer):

    amount_float = serializers.DecimalField(
        source="amount",
        max_digits=15,
        decimal_places=2,
        coerce_to_string=False,
        required=False,
    )

    class Meta:
        model = Expense
        fields = "__all__"


class IncomeSerializer(serializers.ModelSerializer):
    amount_float = serializers.DecimalField(
        source="amount",
        max_digits=15,
        decimal_places=2,
        coerce_to_string=False,
        required=False,
    )

    class Meta:
        model = Income
        fields = "__all__"


class BalanceSerializer(serializers.Serializer):
    expense_sum = serializers.DecimalField(decimal_places=2, max_digits=16)
    income_sum = serializers.DecimalField(decimal_places=2, max_digits=16)
    balance = serializers.DecimalField(decimal_places=2, max_digits=14)
