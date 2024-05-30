sudo apt update && sudo apt upgrade -y
sudo apt install git build-essential npm nginx certbot gnupg curl -y

curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash - 
sudo apt install nodejs -y 

sudo useradd -m builduser
sudo passwd -d builduser
echo 'builduser ALL=(ALL) NOPASSWD: ALL' | sudo tee /etc/sudoers.d/builduser

curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org


sudo systemctl enable --now mongod





##################################################################

sudo mkdir -p /var/www; sudo git clone https://github.com/jimchen2/My-Website /var/www/My-Website; sudo chown -R builduser:builduser /var/www/My-Website
sudo -u builduser bash -c 'cd /var/www/My-Website; mongorestore --dir=./dump; mongoimport --db test --file ./dump/test/blogs.json'

sudo -u builduser bash -c 'cd /var/www/My-Website/backend; npm install'
sudo cp /var/www/My-Website/my-website-backend.service /etc/systemd/system/my-website-backend.service
sudo systemctl daemon-reload && sudo systemctl enable --now my-website-backend
# Install frontend dependencies and build
sudo -u builduser bash -c 'cd /var/www/My-Website/frontend; npm install; npm run build'

sudo systemctl stop nginx 
sudo systemctl stop ufw
sudo certbot certonly --standalone -d jimchen.me -d www.jimchen.me --email jimchen4214@gmail.com --non-interactive --agree-tos 

mkdir -p /etc/nginx/{sites-available,sites-enabled} && sudo ln -sf /etc/nginx/sites-available/mywebsite.conf /etc/nginx/sites-enabled/
sudo cp /var/www/My-Website/mywebsite.conf /etc/nginx/sites-available/mywebsite.conf
sudo cp /var/www/My-Website/nginx.conf /etc/nginx/nginx.conf
sudo systemctl enable --now nginx

sudo cp /var/www/My-Website/update-mywebsite.{service,timer} /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now update-mywebsite.timer