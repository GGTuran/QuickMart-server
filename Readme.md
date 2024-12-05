# QuickMart Backend

## QuickMart is a feature-rich e-commerce platform designed to deliver a seamless online shopping experience for users, vendors, and administrators. It provides a dynamic and intuitive environment where users can effortlessly browse and purchase products, vendors can efficiently manage their shops and inventories, and administrators can maintain full control of the platform. With robust authentication and secure payment integrations, QuickMart ensures a reliable and secure shopping journey. The application’s highlights include advanced product filtering, responsive design, and scalable features such as paginated product listings and order histories. By combining modern technologies like Node.js, Express.js, and MongoDB, QuickMart is built to be scalable, user-friendly, and enterprise-ready, catering to the needs of a growing digital marketplace.

## Live URL

[Live link](https://mart-server.vercel.app)

## Features

- **User Authentication**: Users can sign up, log in.
- **Shop Management**: Vendors can create and personalize their shops with details such as name, logo, and description. They can also manage product inventory, add or edit product details, and respond to customer reviews.
- **Admin Controls**: Administrators can monitor activities, manage users and vendors, and dynamically add, edit, or delete product categories.
- **Payment Management**: An user can pay for premium posts allowing them to see all premium posts.

Technology Stack:

- Programming Language: TypeScript
- Web Framework: Express.js
- Database: MongoDB(Mongoose for ODM)
- Validation Library: Zod
- Authentication & Authorization : JSON Web Token
- Payment : aamarpay
- Deployment : Vercel

The api has the following endpoints:
API Endpoints:

- /api/auth
- /api/users
- /api/product
- /api/shop
- /api/review
- /api/category
- /api/order
- /api/payment

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Clone the repository

**Follow this simple step to clone the project:**

```bash
git clone  https://github.com/GGTuran/QuickMart-server.git
```

**Now install the dependencies of the project:**

```bash
npm install
```

## Set up the server

**Set up the environment variables in .env file**

```
PORT = 5000
DATABASE_URL=your_own_mongodb_uri
BCRYPT_SALT_ROUNDS= any number
JWT_ACCESS_SECRET= Your JWT Secret
JWT_ACCESS_EXPIRES= Your Jwt Token Expire time
STORE_ID = Your aamarpay store id
SIGNATURE_KEY = Your aamarpay signature key
PAYMENT_URL = aamarpay base url for payment
PAYMENT_VERIFY_URL = aamarpay base url for verifying transaction id
RESET_PASS_UI_LINK = http://localhost:3000
APP_PASS = your google app password
CLOUDINARY_CLOUD_NAME = your cloudinary cloud name
CLOUDINARY_API_KEY = your cloudinary api key
CLOUDINARY_API_SECRET = your cloudinary api secret
```

**You can compile typescript**

```
npm run build
```

## Start the server

**You can run the server in development mode**

```
npm run start:dev
```

**Or you can start the server by running the js files which is recommended**

```
npm run start:prod
```
