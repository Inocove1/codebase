# codebase
The codebase contains the latest code deployed in production.
This readme file will be grouped as three parts.
Part 1 For Development:
IDE used: Visual Studio Code
Folder Client - AngularJS 4 code written in Typescript
Folder Server - NodeJS code written in Typescript.

## Steps for local dev setup ##
  1. Before cloning the project from github. setup local env flowing the steps @ https://angular.io/guide/quickstart
  2. After successfully running the quickstart project replace it with files from inocove repo.
  3. Setup SSL for local following the article @ https://deliciousbrains.com/https-locally-without-browser-privacy-errors/
  4. Update the path to the cert in the package.json find line below 
     > "devcode": "concurrently \"mongod\" \"ng serve --ssl 1 --ssl-key \"C:\\Users\\IntegrateLogic\\Projects\\certs\\server.key\" --ssl-cert \"C:\\Users\\IntegrateLogic\\Projects\\certs\\server.crt\"  -pc proxy.conf.json --open\" \"tsc -w -p server\" \"nodemon dist/server/app.js\"",
  5. If you have all things setup right and have stared the mongod the app should be available at https://localhost:4200

## Steps for prod deployment ##
  1. Backup /srv/inocove/inocove-app/dist/public/assets/content
  2. Backup /srv/inocove/inocove-app/dist/public/assets/images/profile
  3. Run 
     > 1. sudo systemctl stop inocoveapp
     > 2. sudo systemctl stop mongodb
  4. Now copy folders client and server to /srv/inocove/inocove-app/ using winscp or any ftp client
  5. Run 
     > 1. npm run build
     > 2. npm run predev
  6. Put back the folders backed up in the resp location.
  7. Run 
     > 1. sudo systemctl start mongodb
     > 2. sudo systemctl start inocoveapp
  8. Test https://www.inocove.com
