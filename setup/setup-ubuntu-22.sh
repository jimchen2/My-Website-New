sudo apt update && sudo apt upgrade -y
sudo apt install git build-essential npm nginx certbot gnupg curl screen -y

curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt install nodejs -y

# sudo useradd -m ubuntu
# sudo passwd -d ubuntu
# echo 'ubuntu ALL=(ALL) NOPASSWD: ALL' | sudo tee /etc/sudoers.d/ubuntu

curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc |
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
      --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

sudo systemctl enable --now mongod

sudo mkdir -p /etc/nginx/{sites-available,sites-enabled}
sudo systemctl enable --now nginx
# sudo cp /var/www/My-Website/setup/nginx.conf /etc/nginx/nginx.conf

##################################################################

sudo git clone https://github.com/jimchen2/My-Website-New /var/www/My-Website-zh
sudo chown -R ubuntu:ubuntu /var/www/My-Website

# sudo systemctl stop ufw
sudo certbot certonly --standalone -d jimchen.me --email jimchen4214@gmail.com --non-interactive --agree-tos
sudo certbot certonly --standalone -d www.jimchen.me --email jimchen4214@gmail.com --non-interactive --agree-tos

sudo ln -sf /etc/nginx/sites-available/jimchen.me.conf /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/www.jimchen.me.conf /etc/nginx/sites-enabled/
sudo cp /var/www/My-Website/setup/jimchen.me.conf /etc/nginx/sites-available/jimchen.me.conf
sudo cp /var/www/My-Website/setup/www.jimchen.me.conf /etc/nginx/sites-available/www.jimchen.me.conf

sudo cp /var/www/My-Website/setup/{my-website.service,update-mywebsite.service,update-mywebsite.timer} /etc/systemd/system/
sudo systemctl start update-mywebsite.service
sudo systemctl enable --now my-website.service
sudo systemctl enable update-mywebsite.timer


##################################################################



sudo git clone https://github.com/jimchen2/My-Website-New /var/www/My-Website
sudo chown -R ubuntu:ubuntu /var/www/My-Website
sudo certbot certonly --standalone -d cn.jimchen.me --email jimchen4214@gmail.com --non-interactive --agree-tos
sudo certbot certonly --standalone -d jimchen.me --email jimchen4214@gmail.com
sudo ln -sf /etc/nginx/sites-available/cn.jimchen.me.conf /etc/nginx/sites-enabled/
sudo cp /var/www/My-Website/setup/cn.jimchen.me.conf /etc/nginx/sites-available/cn.jimchen.me.conf
sudo ln -sf /etc/nginx/sites-available/jimchen.me.conf /etc/nginx/sites-enabled/
sudo cp /var/www/My-Website/setup/jimchen.me.conf /etc/nginx/sites-available/jimchen.me.conf


sudo cp /var/www/My-Website/setup/{my-website.service,update-mywebsite-zh.service,update-mywebsite-zh.timer} /etc/systemd/system/
sudo systemctl start update-mywebsite-zh.service
sudo systemctl enable --now my-website.service
sudo systemctl enable update-mywebsite-zh.timer
