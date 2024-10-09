## Build and Install 

```sh
docker build --no-cache -t jimchen2/my-website:latest .
docker run -d --restart always --env-file .env -p 3010:3000 jimchen2/my-website:latest
docker push jimchen2/my-website
```
