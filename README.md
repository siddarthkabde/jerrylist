# contactlist
### Prerequisites:
- Node.js installed
- Create directory /webapp/resources for OpenUI5 resources
- Open a commandline in root directory of this app and run
```
npm install
```
- Install MongoDB.
- Start MongoDB with the following command and keep this window opened! 
```
mongod --dbpath "<path to your database>"
```

- Start the mongo shell in a new window with
```
mongo
```
- In the mongo shell perform the following steps
- Change to database contactlist
```
use contactlist
```
- Load the mockdata in the collection contactlist:
```
db.contactlist.insert([ 
  { 
    "_id": 1, 
    "firstName": "Matthew", 
    "lastName": "Murdoc", 
    "address": { 
      "street": "Coffee Avenue", 
      "houseNumber": 13, 
      "postalCode": "66778", 
      "city": "Hell's Kitchen" 
    } 
  }, 
  { 
    "_id": 2, 
    "firstName": "Bruce", 
    "lastName": "Wayne", 
    "address": { 
      "street": "Tea Street", 
      "houseNumber": 25, 
      "postalCode": "11223", 
      "city": "Gotham" 
    } 
  } 
]);
```
- You can shut down the mongo shell with Ctrl + C.
- Start the webserver with 
```
node server.js
```
- Point your browser to http://localhost:4000/