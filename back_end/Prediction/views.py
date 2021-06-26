from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
import re
import string
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression


def word_drop(data):
    data = data.lower()
    data = re.sub('\[.*?\]','',data)
    data = re.sub('\\W',' ',data)
    data = re.sub('https?://\S+|www.\S+','',data)
    data = re.sub('<.*?>+','',data)
    data = re.sub('[%s]'%re.escape(string.punctuation),'',data)
    data = re.sub('\n','',data)
    data = re.sub('\w*\d\w','',data)
    return data


class Model_Predict(APIView):
    def post(self, request, format=None):
        #data = request.data
        df_sentiments = pd.read_csv(r"Prediction/models/analyse_sentiments.csv")
        x = df_sentiments["data"]
        y = df_sentiments["class"]
        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25)
        vectorization = TfidfVectorizer()
        xv_train = vectorization.fit_transform(x_train)
        xv_test = vectorization.transform(x_test)
        LR = LogisticRegression()
        LR.fit(xv_train, y_train)
        pred_lr = LR.predict(xv_test)
        # TEST INPUT USER
        req = request.data
        testing_news = {"News": [req]}
        new_def_test = pd.DataFrame(testing_news)
        # word_drop:: la méthode qui supprime les caractère spéciaux
        new_def_test["News"] = new_def_test["News"].apply(word_drop)
        new_x_test = new_def_test["News"]
        new_xv_test = vectorization.transform(new_x_test)
        pred_LR = LR.predict(new_xv_test)
        return Response(pred_LR[0], status=200)
        #response_dict = {"Les resultats de predictions": pred_LR[0]}
        #return Response(response_dict, status=200)


class Model_Predict_News(APIView):
    def post(self, request, format=None):
        #data = request.data
        df_news = pd.read_csv(r'Prediction/models/fake_true_news.csv')
        x = df_news["data"].values.astype('U')
        y = df_news["class"].values.astype('U')
        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25)
        vectorization = TfidfVectorizer()
        xv_train = vectorization.fit_transform(x_train)
        xv_test = vectorization.transform(x_test)
        LR = LogisticRegression()
        LR.fit(xv_train, y_train)
        pred_lr = LR.predict(xv_test)
        # TEST INPUT USER
        req = request.data
        testing_news = {"News": [req]}
        new_def = pd.DataFrame(testing_news)
        # word_drop:: la méthode qui supprime les caractère spéciaux
        new_def["News"] = new_def["News"].apply(word_drop)  ##HEREEEEE
        new_x_test = new_def["News"]
        new_xv_test = vectorization.transform(new_x_test)
        pred_LR = LR.predict(new_xv_test)
        response_dict = {"Les resultats de predictions": pred_LR[0]}
        return Response(response_dict, status=200)
