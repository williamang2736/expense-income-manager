from rest_framework import serializers
from transactions.models import Expense, Income


class ExpenseSerializer(serializers.ModelSerializer):
    amountFloat = serializers.DecimalField(
        source="amount", max_digits=14, decimal_places=2, coerce_to_string=False
    )

    class Meta:
        model = Expense
        fields = "__all__"


class IncomeSerializer(serializers.ModelSerializer):
    amountFloat = serializers.DecimalField(
        source="amount", max_digits=14, decimal_places=2, coerce_to_string=False
    )

    class Meta:
        model = Income
        fields = "__all__"
        extra_kwargs = {"amount": {"max_digits": 14, "decimal_places": 2}}

