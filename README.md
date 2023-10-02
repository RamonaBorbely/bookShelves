# bookShelves

BooksShelves is a full-stack web app that allows users to manage their books collections. Users can register, login and maintain a list of books.

## Setting up MongoBD Atlas
1. Create a MongoDB atlas cloud
2. Build a new cluster
3. Configure cluster -> Network access -> Add ip address, then Database Access -> create a new user with username and password
4. Connect to cluster 

## Setup and installation

1. Clone the repository and navigate to project directory
git clone https://github.com/RamonaBorbely/bookShelves.git
cd bookShelves

2. Create .env file at root
   
create MONGODB_URI varialble and set it to connection string from MongoDB Atlas. Replace <password> for user
2. install dependencies 
npm install

4. run the app
npm start


## Technologies used
node js
express js
mongoDB(with Mongoose)
Passport js 
ejs for templating 
tailwind css for styling

### useage
1. navigate to the registration page and create account
2. login using credentials
3. start adding books to your collection or browse existing books
