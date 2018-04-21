#!/bin/bash

# Bash para fazer chamada no Azure App Service integrando com Azure Function.
# @author Bolzon <blzn@mail.ru>
# @date 21 de abril de 20108

if [ 2 -gt $# ]; then
  printf '\nUSAGE: sh call_func.sh <url_appservice> <url_function>\n\n'
  exit 1
fi

URL_APP_SERVICE=$1
URL_FUNCTION=$2

printf '\n'

curl -X POST -H 'Content-type: application/json' -d "{ \"functionUrl\": \"$URL_FUNCTION\", \"numA\": 10, \"numB\": 20 }" $URL_APP_SERVICE

printf '\n\n'
