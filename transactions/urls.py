from rest_framework import routers
from .api import ExpenseViewSet, IncomeViewSet, BalanceViewSet

router = routers.DefaultRouter()
router.register("api/expenses", ExpenseViewSet, "expenses")
router.register("api/incomes", IncomeViewSet, "incomes")
router.register("api/balance", BalanceViewSet, "balance")

urlpatterns = router.urls
