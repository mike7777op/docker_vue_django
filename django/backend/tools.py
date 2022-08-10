from django.db import connections
from django.core.serializers.json import DjangoJSONEncoder
from datetime import datetime, timedelta
from typing import Union
import json

# 關閉無效連線
def close_old_connections() -> None:
    for conn in connections.all():
        conn.close_if_unusable_or_obsolete()

# 時間轉換
def timedecode(input_time:str) -> str:
    return input_time.strftime('%Y-%m-%d %H:%M:%S')

def timeencode(input_time:Union[str, datetime], hours:int=0, mins:int=0) -> datetime:
    if isinstance(input_time, str):
        input_time = datetime.strptime(input_time, '%Y-%m-%d %H:%M:%S')
    input_time += timedelta(hours=hours,minutes=mins)
    return input_time

# 確認 Data參數
def checkDataParam(data:dict, check_list:list=[]) -> tuple:
    status, err = True, ""
    for item in check_list:
        if status and item not in data:
            status, err = False, f"Require {item}"
            break
    return status, err

# 回覆範例
def codeStatus(code:int, msg:str="") -> dict:
    res = {"code":code, "msg":msg}
    if code < 0:
        close_old_connections()
    return res

def dict_to_json(dictionary:dict) -> str:
    return json.dumps(dictionary, ensure_ascii=False, indent=4, sort_keys=False, cls=DjangoJSONEncoder)


class ThrowWithCode(Exception):

    def __init__(self, code:int, msg:str="", *args, **kwargs) -> None:
        self.code = code
        self.msg = msg

    def __str__(self):
        return repr(self.msg)