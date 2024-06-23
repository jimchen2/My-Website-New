
## Install 
```sh
# configure .env
docker run -d --env-file .env -p 1241:3000 jimchen2/my-website:latest
```

## Build

```sh
# add Dockerfile
docker build -t jimchen2/my-website:latest .

# add .env
docker run -d --env-file .env -p 1241:3000 jimchen2/my-website:latest
```


    