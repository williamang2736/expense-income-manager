from rest_framework import routers
from .api import ExpenseViewSet, IncomeViewSet

router = routers.DefaultRouter()
router.register("api/expenses", ExpenseViewSet, "expenses")
router.register("api/incomes", IncomeViewSet, "incomes")

urlpatterns = router.urls
