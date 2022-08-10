#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.http import JsonResponse
from django.views import View
import json


class API_HELLO(View):

    def __init__(self, *args, **kwargs) -> None:
        print("run api : hello world")

    def post(self, request, *args, **kwargs) -> JsonResponse:
        try:
            post_data = json.loads(request.body)
            print(post_data)
            res = {"code":1, "msg":"msg.success", "post_data":post_data}
        except Exception as e:
            print(f"hello world post exception, details as below:\n{str(e)}")
            res = {"code":-1, "msg":str(e)}
        return JsonResponse(res)

    def get(self, request, *args, **kwargs) -> JsonResponse:
        try:
            query_data = dict(request.GET)
            print(query_data)
            res = {"code":1, "msg":"msg.success", "query_data":query_data}
        except Exception as e:
            print(f"hello world get exception, details as below:\n{str(e)}")
            res = {"code":-1, "msg":str(e)}
        return JsonResponse(res)