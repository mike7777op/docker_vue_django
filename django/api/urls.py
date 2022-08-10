#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.conf.urls import url
from api import account, hello_world


urlpatterns = [
    url("v1/account/login", account.API_LOGIN.as_view()),
    ### hello world
    url("v1/hello_world", hello_world.API_HELLO.as_view()),
    ### 練習
]
