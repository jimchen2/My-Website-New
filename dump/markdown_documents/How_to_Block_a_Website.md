---
title: "How to Block a Website"
date: Wed Aug 30 2023 17:58:09
type: web
---
## Browser Extension

There is blocksite chrome extension which helps you block websites. But
it is inefficient because

1 Guest Mode no extension 2 I can easily use another browser like,
firefox, opera, palemoon, slim, links2, etc

## /etc/hosts

By changing the /etc/hosts file one can easily block harmful websites by

    sudo gedit /etc/hosts

then adding

    ::1 example.com 
    
### Using chattr to stop tampering

Then in the same directory using

    sudo chattr +i [filename]

Now sudo cannot delete the file directly but sudo can chattr -i then
delete the file.

### Adding to systemctl service

Add a file in /usr/local/bin/

    #!/bin/bash

    cat <<EOL | sudo tee /etc/hosts > /dev/null
    # hosts file
    EOL

make it executable by

    chmod +x /usr/local/bin/[filename]

Then add a systemctl service

    [Unit]
    Description=Update /etc/hosts file

    [Service]
    Type=oneshot
    ExecStart=/usr/local/bin/[filename]

add a timer to the same directory

    [Unit]
    Description=Run update-hosts service every few seconds

    [Timer]
    OnBootSec=10sec
    OnUnitActiveSec=10sec

    [Install]
    WantedBy=timers.target

Then start the service

    sudo systemctl daemon-reload
    sudo systemctl enable enforce-hosts-block.timer
    sudo systemctl start enforce-hosts-block.timer

## Using ufw

You can use firewall to block a domaim.

Ufw is like a frontend to iptables and ip6tables, so I am not using the
firewall.

## IPTable

First dig the domain

    jimchen:~$ dig +short example.com A
    93.184.216.34
    jimchen:~$ dig +short example.com AAAA
    2606:2800:220:1:248:1893:25c8:1946
    jimchen:~$ dig +short jimchen.me
    172.67.133.157
    104.21.5.161
    jimchen:~$ dig +short jimchen.me AAAA
    2606:4700:3032::6815:5a1
    2606:4700:3034::ac43:859d

Also if there are domains with cnames (ipv6 comes to another domain
instead of ip address) then continue digging.

Then drop the ip address in the iptables and ip6tables

    sudo iptables -I OUTPUT 1 -d 93.184.216.34 -j DROP
    sudo ip6tables -I OUTPUT 1 -d 2606:2800:220:1:248:1893:25c8:1946 -j DROP

blocks example.com

However, they are not persistent, so after rebooting rule losts, so run

    sudo apt-get install iptables-persistent

Then store the rule

    sudo sh -c 'iptables-save > /etc/iptables/rules.v4'
    sudo sh -c 'ip6tables-save > /etc/iptables/rules.v6'

## tcpdump

You can also use tcpdump to block websites, also this is unconventional

Add a script that everytime a website is visited just shutdown the
computer.

    #!/bin/bash

    tcpdump -i any 'host zombsroyale.io' -l |
    while read line
    do
        sudo shutdown -h now
        exit
    done

## Conclusion

However, the amount of harmful and gore and explicit websites are far
beyond one\'s control(there are like millions) so it cannot be blocked.
Nevertheless blocking websites is very fun.

Also, there is no way to completely block a website to the root of the
computer since the root can do anything. User can almost never control
the root\'s behavior(even root cannot set rules for root). The only
exception is like you start a systemd service to shutdown when the
computer starts, which can still be recovered by booting into a recovery
mode or use a live CD/USB, mount your system\'s root partition, and then
remove or disable the problematic service.

I previously thought like you can start 2 programs in the background
like one ensuring the other is run, so you can never shut these down.
However, the root can just kill both of them.

So at the end of the day just embrace the variety of Internet and accept
the harmful instances. There is no blocking away from them if your heart
pursues.

## References

- [BlockSite Chrome Extension](https://chrome.google.com/webstore/detail/blocksite-stay-focused-cont/eiimnmioipafcokbfikbljfdeojpcgbh)
- [Iptables Documentation](https://netfilter.org/projects/iptables/)
- [Tcpdump Manual](https://www.tcpdump.org/manpages/tcpdump.1.html)
