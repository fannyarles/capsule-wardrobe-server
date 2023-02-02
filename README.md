# About MinFit

Text

# Backend Stack

## MERN stack

REST API backend using Node & Express

CRUD operations managed with Mongoose.

## Routes

### Auth

- **POST /auth/signup** — Handling signup form data
- **POST /auth/login** — Handling login form data
- **GET /verify** — Checking for authentification token

### User

- **GET /account/:userId** – Retrieving user data for the account page
- **POST /account/upload** – Handling profile picture upload
- **POST /account/edit/:userId** – Handling user informations saving

### Dressing

- **GET /dressing/items/top5** – Retrieving top 5 used items for the dashboard page
- **GET /dressing/user/:userId** – Retrieving user's dressing items
- **GET /dressing/item/:itemId** – Retrieving data for a single item
- **POST /dressing/item/uploadPic** – Handling item picture upload
- **POST /dressing/item/:itemId/updatePic** – Handling single item picture upload
- **POST /dressing/item/add** – Handling single item saving
- **PUT /dressing/item/:itemId** – Handling single item update
- **DELETE /dressing/item/:itemId** – Handling single item deletion
- **GET /dressing/switch/:occasion/:itemType/:currId** – Retrieving data for a specific new item

### Outfits

- **GET /outfits/cat/top5** – Retrieving top 5 outfit categories for the dashboard page
- **GET /outfits/view/:outfitId** – Retrieving data for a single outfit
- **GET /outfits/random/:occasion/:category/:pieceItem** – Handling outfits search
- **GET /outfits/saved** – Retrieving user's saved outfits
- **POST /outfits/save** – Handling outfit saving
- **PUT /outfits/save/:outfitId** – Handling outfit update
- **DELETE /outfits/delete/:outfitId** – Handling outfit deletion
- **GET /dressing/switch/:occasion/:itemType/:currId** – Retrieving data for a specific new item

### STRIPE

- **POST /create-payment-intent** — Handling payments

## Nodejs packages

- bcryptjs
- cloudinary
- cors
- dotenv
- express-jwt
- jsonwebtoken
- mongoose
- multer
- multer-storage-cloudinary
- stripe

# Links

[Deployed App](https://minfitapp.netlify.app/)

[Front-End Git Repository](https://github.com/fannyarles/capsule-wardrobe-client)
