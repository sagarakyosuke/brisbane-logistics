Brisbane Logistics – Installation Guide
This guide explains how to install and run the Brisbane Logistics project on another computer.

Clone git or download directly: git clone https://github.com/sagarakyosuke/brisbane-logistics.git

1. Install Required Software
Before starting, install the following:
1. PHP (compatible with the Laravel project) Xampp
2. Composer
3. Node.js (LTS version)
4. MySQL
5. Git

php -v
composer -V
node -v
npm -v
git --version

once you install xampp php phpmyadmin

make database named 'brisbane_logistics'

For Backend

cd api

composer install

php artisan migrate

php artisan db:seed


For Frontend

cd app

npm install