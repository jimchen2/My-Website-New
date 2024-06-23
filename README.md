## Install

```sh
# configure .env
docker run -d --restart always --env-file .env -p 3011:3000 jimchen2/my-website:latest
```

## Build

```sh
# add Dockerfile
docker build -t jimchen2/my-website:latest .
```

