## ToDo

1. Integrate with [markdown-parser](https://github.com/jimchen2/markdown-parser) for syncing
2. Remove the Chinese translation(they are stupid and super bloated)
3. Change the Header to About/Blog/LinkTree, LinkTree embed, then remove footer

## Install

```sh
# configure .env
docker run -d --restart always --env-file .env -p 3010:3000 jimchen2/my-website:latest
```

## Build

```sh
# add Dockerfile
docker build --no-cache -t jimchen2/my-website:latest .
```

build then push
```sh
sudo docker build --no-cache -t jimchen2/my-website:latest . && docker push jimchen2/my-website:latest
```
