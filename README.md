Brisbane Logistics – Installation Guide
This guide explains how to install and run the Brisbane Logistics project on another computer.
1. Install Required Software
Before starting, install the following:
1. PHP (compatible with the Laravel project)
2. Composer
3. Node.js (LTS version)
4. MySQL
5. Git
6. Visual Studio Code (optional)


php -v
composer -V
node -v
npm -v
git --version


git clone https://github.com/sagarakyosuke/brisbane-logistics.git


cd api

composer install

php artisan migrate

php artisan db:seed


cd app

npm install