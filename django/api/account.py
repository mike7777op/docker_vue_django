#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.http import JsonResponse
from django.views import View
from django.contrib.auth.hashers import check_password
from backend.tools import codeStatus, ThrowWithCode
from api import models
import json, base64


class API_LOGIN(View):

    def __init__(self, *args, **kwargs) -> None:
        print("run api : user login")

    def post(self, request, *args, **kwargs) -> JsonResponse:
        try:
            post_data = json.loads(request.body)
            try:
                user = models.Account.objects.get(id=post_data["username"])
                if user.id != post_data["username"]:
                    raise Exception()
            except:
                raise ThrowWithCode(0, msg="account.error.account_not_found")

            base64_pass = post_data["password"]
            level1_pass = base64.urlsafe_b64decode(base64_pass.encode("ascii"))
            source_pass = base64.urlsafe_b64decode(level1_pass.decode("ascii")).decode("ascii")
            result = check_password(source_pass, user.password)
            if not result:
                raise ThrowWithCode(0, msg="account.error.name_and_pass_not_match")

            res = codeStatus(1, msg="msg.success")
            res.update({
                "user_home":"welcome",
                "user_name":user.name,
            })
        except ThrowWithCode as e:
            res = e.__dict__
        except Exception as e:
            print(f"user login exception, details as below:\n{str(e)}")
            res = codeStatus(-1, msg="app.system_exception")
        return JsonResponse(res)