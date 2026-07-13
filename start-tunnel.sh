#!/bin/bash
set -e
# Start proxy
nohup python3 -c "
from flask import Flask, request, Response
import requests, urllib.parse
app = Flask(__name__)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>', methods=['GET','POST','PUT','DELETE','PATCH','HEAD','OPTIONS'])
def proxy(path):
    url = request.args.get('url', '') or 'http://' + path
    if not url.startswith('http'): url = 'http://' + url
    h = {k:v for k,v in request.headers if k.lower() not in ['host','content-length','transfer-encoding']}
    r = requests.request(method=request.method, url=url, headers=h, data=request.get_data(), params=request.args, timeout=30, allow_redirects=False)
    return Response(r.content, r.status_code, {k:v for k,v in r.headers.items() if k.lower() not in ['transfer-encoding','content-encoding','content-length','connection']})
@app.route('/proxy') 
def ip():
    import json
    return json.dumps({'ip': requests.get('https://httpbin.org/ip').json().get('origin','')})
app.run(host='0.0.0.0', port=3000)
" > /tmp/proxy.log 2>&1 &

# Wait for proxy to start
sleep 3

# Create reverse tunnel through serveo.net
for i in 1 2 3; do
  ssh -o StrictHostKeyChecking=no -o ServerAliveInterval=30 -R 80:localhost:3000 -f -N serveo.net 2>&1
  if [ $? -eq 0 ]; then
    echo "TUNNEL_OK"
    break
  fi
  sleep 5
done

# Keep alive
while true; do
  curl -s http://localhost:3000/proxy 2>/dev/null && echo "PROXY_OK"
  sleep 60
done
