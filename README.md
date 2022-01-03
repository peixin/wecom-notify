# Push messages through WeCom self-built APP host on Cloudflare Workers

[Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)

[WeCom Send APP Message Docs](https://work.weixin.qq.com/api/doc/90000/90135/90236)



```bash
wrangler secret put WECOM_CROP_ID
wrangler secret put WECOM_SECRET
wrangler secret put SECRET_KEY
```

```bash
curl -L -X POST "http://127.0.0.1:8787" \
-H "API-KEY: XZrpFyLKQ0dewdUSdW8wc5rd0vJ9lMdUddovhms7BKo=" \
-H "Content-Type: application/json" \
--data-raw '{
    "message": {
        "agentId": 1000001,
        "toUser": "@all",
        "message": "test"
    },
    "timestamp": 1641224537
}'
```