## Build and Install 

```sh
docker build --no-cache -t jimchen2/my-website:latest .
docker run -d --restart always --env-file .env -p 80:3000 jimchen2/my-website:latest
docker push jimchen2/my-website
```

## ToDO

- [ ] Build a markdown renderer in one file (use one for both Deskto pand Mobile)
- [ ] Write many tests for the markdown renderer
- [ ] `next.config.mjs` has many patches to make it build, follow best practices
- [ ] Reformat source code into different components
- [ ] Add YouTube Video Page
- [ ] Change title to from `?title=...` to `/type/title`
- [ ] Implement in-memory caching for Preview Page for all blogs
- [ ] Build a better search function
- [ ] Support multi hierarchy
- [ ] Add Online Profiles
- [ ] Fix Docker Error



## All My Online Profiles

- [GitHub](https://github.com/jimchen2)
- [YouTube](https://www.youtube.com/@JC-ss5nj)
- [WeChat](https://cdn.jimchen.me/w.jpg)
- [QQ](https://cdn.jimchen.me/qq.jpg)
