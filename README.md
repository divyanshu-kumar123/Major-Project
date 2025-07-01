# 🌍 Wanderlust – Airbnb Clone

Wanderlust is a full-featured Airbnb-like web application built using **Node.js**, **Express.js**, **MongoDB Atlas**, and **EJS**. Users can list their properties (rooms, hotels, farms, etc.) and browse places added by others. The app includes secure authentication, role-based authorization, form validation, file uploads to Cloudinary, and a working review system.

---

## 🚀 Features

- 🧾 User Registration & Login (with Passport.js)
- 🔒 Role-based Authorization & Authentication
- 🏘️ Add, View, and Explore Properties
- 🗂️ MongoDB Atlas as the hosted database
- 📷 Image Upload (Multer + Cloudinary)
- 🗣️ Review & Ratings System
- 💬 Contact Owner (owner details displayed)
- ✅ Server-side validation (Joi)
- ⚙️ Session management & flash messaging
- 🖼️ Beautiful UI using EJS templating & EJS-Mate layout engine

---

## 🛠️ Tech Stack

| Technology      | Purpose                         |
|-----------------|----------------------------------|
| Node.js         | Server-side JavaScript runtime  |
| Express.js      | Web framework for Node.js       |
| MongoDB Atlas   | NoSQL database (hosted)         |
| Mongoose        | ODM for MongoDB                 |
| EJS & EJS-Mate  | Templating engine & layouts     |
| Passport.js     | Authentication                  |
| Joi             | Backend data validation         |
| Cloudinary      | Image hosting                   |
| Multer          | File uploads                    |
| connect-mongo   | MongoDB session store           |
| dotenv          | Environment variable management |

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/f0c5f666-1d4a-485c-9864-6b7e55f2a3fe)


---

## 🧪 Installation

### 1. Clone the repo

```bash
git clone https://github.com/divyanshu-kumar123/WanderLust-AirbnbClone.git

````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory and add the following:

```env
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET_KEY=your_api_secret
ATLASDB_URL=your_mongo_atlas_url
SECRET=session_secret
```

### 4. Run the app

```bash
node app.js
```

Now open your browser and go to:

```text
http://localhost:8080/listings
```

---



