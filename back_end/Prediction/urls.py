from django.urls import path
import Prediction.views as views

urlpatterns = [
    path('predictsentiment/', views.Model_Predict.as_view(), name='predictsentiment'),
    path('predictnews/', views.Model_Predict_News.as_view(), name='predictnews'),

]
