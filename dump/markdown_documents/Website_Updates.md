---
title: "Website Updates"
date: Thu Apr 18 2024 05:58:49
type: web
---

## Did a few updates

1. Removed the centralized `nginx.conf`, and added sites below available sites for better organization
2. Created Automatic script to build the website on Linode
3. Created Automatic script to update the website on Linode
4. Removed the `id` requirement in the `md_to_dump.py` file, and stopped pushing bloated blogs dir to github
5. Signed Up for UptimeRobot to monitor my uptime

## Some more things to note

1. On ArchLinux everything is DIY, so `certbot` doesn't automatic renew
2. The traditonal directories (sites-enabled, sites-available) isn't automatically created, and shall be created by the user (depending on the needs)
3. Don't use certbot with a plugin, just use certbot directly
4. Usage of `sudo` in systemd files shalll be treated with caution
5. In ArchLinux the traditional nginx user, http user isn't created. One can create any user based on the needs.
6. As much as I love ArchLinux, most of the packages are community maintained and on a rolling release, meaning I have to maintain the setup script actively(or else it won't work, but most likely it won't have any problems). Someone from Reddit said he run pacman -Syu every week and didn't have a problem for 2 years. But that doesn't mean ArchLinux's rolling packages is the only cause of problems, namingly npm packages might also cause problems
7. I am far from utilzing the cpus, as the average usage is around 3 percent for my website. Although VPS not very expensive, it made me unhappy to watch computing resources not being utilized. I want to migrate to Hertzner because I think I probably like Helsinki and it offers bigger storage options with much cheaper pricing, and resources can be a little more utilized
8. Misconfiguration of nginx can cause react website to render incorrectly(it still works but the react frontend buttons changed into clickboxes and got bundled together, kinda weird)
9. Explicitly rewrite the `api` route in nginx `rewrite ^/api/(.*) /$1 break;
10. Don't request too many certs from certbot, there is a limit and my website got down for 2 days because of requesting too many certs
11. Automated scripts makes vps much easier to control, on the downsides that they need some debugging

## References

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Certbot Documentation](https://certbot.eff.org/docs/)
- [UptimeRobot Documentation](https://uptimerobot.com/)
