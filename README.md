link zoom<br/>
https://us02web.zoom.us/j/85994341867?pwd=WDBQYzZqbWtrK0J6Q1licTZIMWYzQT09
<br/><br/>
repository<br/>
https://github.com/codemobiles/reactjs_fwd/tree/master/fwd-pos

npx create-react-app fwd-pos --template typescript<br/>
yarn start<br/><br/>

cd backend<br/>
npx nodemon server.js<br/>


--
tsrfc

npm install --save-dev create-react-component-folder

// src/components/pages
npx crcf -f  --notest --typescript LoginPage RegisterPage ReportPage StockPage StockCreatePage StockEditPage TransactionPage ShopPage

// src/components/layouts
npx crcf -f  --notest --typescript Header Menu

// src/components/fragments
npx crcf -f  --notest --typescript StockCard Payment

# local vscode setting
.vscode/settings.json


# all frontend dependency
yarn add axios chart.js react-chartjs-2 react-moment react-number-format redux react-redux formik redux-logger redux-thunk url-join clsx @material-ui/lab  jsonwebtoken @types/jsonwebtoken material-table formik-material-ui @types/redux-logger react-router-dom@5.2.0 @types/react-router-dom @react-hook/debounce  @types/moment  @mui/x-data-grid@next  <br/>
yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material

# server
cd backage<br/>
npx nodemon server.js<br/><br/>
create package: npm init -y<br/><br/>
install library<br/>
yarn add express


# mongo
mongo<br/>
show dbs<br/>
exit<br/>
create database: use fwd<br/>
db.users.insert({username: "admin", password: "123"})<br/>
show collections<br/>
db.users.find()<br/>
db.users.find().pretty<br/>
db.users.find({username: "admin2"})<br/>
drop database: db.dropDatabase()<br/>
drop collections: db.users.drop()<br/>
current database: db.getName()<br/>

<br/><br/>
add library
yarn add express fs-extra formidable cors bcryptjs rand-token jsonwebtoken mongoose mongoose-sequence onesignal-node
<br/>
<br/>
mongo restore<br/>

download<br/>
https://www.mongodb.com/try/download/tools<br/>
select MongoDB Database Tools<br/>
download zip and copy in all folder bin to c program file mongo
mongodump -d demopos -o .<br/>
mongorestore -d demopos D:\react\fwd-pos\backend\dummy_db_cmpos

#generate key
http://travistidwell.com/jsencrypt/demo/


# extension
https://medium.com/@Jeerawat_Dev/%E0%B9%81%E0%B8%99%E0%B8%B0%E0%B8%99%E0%B8%B3-extension-vscode-visual-studio-code-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A-developer-react-angular7-dc322d7e8227<br/>
<br/>
Auto Close Tag<br/>
Auto Import<br/>
Auto Rename Tag<br/>
Bracket Pair Colorizer<br/>
Code Spell Checker<br/>
Color Highlight<br/>
GitLens<br/>
Prettier<br/>

