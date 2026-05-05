# Deploy — Servidor Local com nginx + Cloudflare Tunnel

## 1. Rodar o servidor

```bash
npm run build        # build de produção
npm start            # inicia em http://0.0.0.0:3000
```

Ou em desenvolvimento:
```bash
npm run dev
```

## 2. nginx (reverse proxy com suporte a WebSocket)

Crie `/etc/nginx/sites-available/impostor`:

```nginx
server {
    listen 80;
    server_name impostor.seudominio.com;  # ou o domínio do tunnel

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;

        # WebSocket — obrigatório para Socket.io
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_read_timeout 86400;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/impostor /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 3. Cloudflare Tunnel

```bash
# Instalar cloudflared
# https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/

# Autenticar
cloudflared tunnel login

# Criar tunnel
cloudflared tunnel create impostor-game

# Configurar (~/.cloudflared/config.yml)
tunnel: <TUNNEL_ID>
credentials-file: /home/user/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: impostor.seudominio.com
    service: http://localhost:80
  - service: http_status:404

# Adicionar DNS no Cloudflare
cloudflared tunnel route dns impostor-game impostor.seudominio.com

# Rodar
cloudflared tunnel run impostor-game
```

## 4. systemd (opcional — iniciar automaticamente)

`/etc/systemd/system/impostor.service`:

```ini
[Unit]
Description=Impostor Game
After=network.target

[Service]
WorkingDirectory=/caminho/para/impostor-game
ExecStart=/usr/bin/npm start
Restart=always
User=seu-usuario
Environment=NODE_ENV=production PORT=3000

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable impostor
sudo systemctl start impostor
```
