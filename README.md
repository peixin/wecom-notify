# Push messages through `WeCom` self-built APP host on `Cloudflare Workers`

[Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)

[WeCom Send APP Message Docs](https://work.weixin.qq.com/api/doc/90000/90135/90236)


```bash
curl -X POST "http://127.0.0.1:8787" \
-H "Content-Type: application/json" \
-d '{
    "agentId": 1000001,
    "toUser": "@all",
    "message": "test"
}'
```