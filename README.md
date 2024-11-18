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