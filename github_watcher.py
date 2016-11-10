#!/usr/bin/env python

from flask import Flask, request
import json
import subprocess


app = Flask(__name__)

def restart_server():
  bashCommand = "./prod_restart"
  process = subprocess.Popen(bashCommand.split())

@app.route('/',methods=['POST'])
def foo():
  data = json.loads(request.data)
  if data["pusher"]["name"] == "N-McA":
    if data["ref"] == "refs/heads/production":
      restart_server()
  print data
  return "OK"

if __name__ == '__main__':
  app.run(port=9999, host="0.0.0.0")
