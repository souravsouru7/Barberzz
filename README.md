Barbezz

Barbezz is a MERN stack application designed to streamline the process of booking appointments at barbershops. Instead of waiting at the shop, users can find nearby salons, view available time slots, and book appointments in advance. This helps customers avoid wait times and have a more convenient experience. Additionally, users can communicate with the shop, pay online, and leave reviews for their experience.

Problem Solved

Barbershops often have long wait times, causing inconvenience for customers. Barbezz addresses this by allowing users to:

Find nearby barbershops and view their services.

Check real-time availability of slots and book appointments.

Use the app to go directly at the selected time without waiting.


Shopkeepers can easily manage bookings, receive notifications, and communicate with customers, creating a smoother experience for both sides.

Key Features

User Side

Nearby Salon Search: Users can find nearby barbershops and browse available services.

Real-Time Slot Booking: Users can view and book available time slots based on their convenience.

Chat with Shopkeepers: Integrated chat using Socket.IO for seamless communication with shopkeepers.

Online Payment: Users can securely pay online through the app.

Reviews and Favorites: Users can rate shops, leave reviews, and add favorite shops for future reference.


Shopkeeper Side

Shop Registration: Shopkeepers can register their shops and provide service details.

Manage Time Slots: Add or modify available time slots for appointments.

Booking Notifications: Get real-time notifications when users book slots.

Booking Management: Track all current and upcoming bookings in one place.


Tech Stack

Backend

Node.js: Backend server setup.

Express: API framework for managing routes and requests.

MongoDB: Database for storing user, shop, and booking details.

Socket.IO: Real-time communication for chat features.

Cloudinary: Image storage for shop profile pictures.

Twilio: Notifications and messaging.

Authentication: JWT, Passport (Google OAuth), bcrypt for secure login and registration.


Backend Dependencies

bcrypt, bcryptjs, cloudinary, cors, dotenv, express, express-session, jsonwebtoken, mongoose, multer, nodemailer, passport, passport-google-oauth20, path, twilio


Frontend

React: Frontend library for building UI.

Redux: State management for consistent UI updates.

Socket.IO Client: Real-time communication for chat.

Formik & Yup: Form validation.

Framer Motion: UI animations for smooth transitions.

Axios: API calls.

Flatpickr: Calendar picker for date selection.


Frontend Dependencies

axios, flatpickr, formik, framer-motion, lodash, lucide-react, react, react-dom, react-icons, react-redux, react-router-dom, react-scripts, redux, socket.io-client, three, web-vitals, yup


How to Run the Project

1. Clone the repository:

git clone https://github.com/your-username/barbezz.git
cd barbezz


2. Install Dependencies:

Backend: npm install (in the root/backend folder)

Frontend: npm install (in the frontend folder)



3. Set Up Environment Variables:

Create a .env file in the root directory for the backend and add configurations like database URL, JWT secret, and Cloudinary/Twilio API keys.



4. Start the Servers:

Backend: npm run start

Frontend: npm start



5. Access the Application:

Open your browser and navigate to http://localhost:3000.




Future Improvements

Add more detailed analytics for shopkeepers on customer engagement.

Introduce a loyalty program for frequent users.

Add multilingual support for a broader user base.


Enjoy a convenient and efficient way to book barbershop appointments with Barbezz!
