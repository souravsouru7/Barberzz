<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  
</head>
<body>
  <h1>Barbezz</h1>
  <p><strong>Barbezz</strong> is a MERN stack application designed to streamline the process of booking appointments at barbershops. Instead of waiting at the shop, users can find nearby salons, view available time slots, and book appointments in advance. This helps customers avoid wait times and have a more convenient experience. Additionally, users can communicate with the shop, pay online, and leave reviews for their experience.</p>

  <h2>Problem Solved</h2>
  <p>Barbershops often have long wait times, causing inconvenience for customers. Barbezz addresses this by allowing users to:</p>
  <ul>
    <li>Find nearby barbershops and view their services.</li>
    <li>Check real-time availability of slots and book appointments.</li>
    <li>Go directly at the selected time without waiting.</li>
  </ul>
  <p>Shopkeepers can easily manage bookings, receive notifications, and communicate with customers, creating a smoother experience for both sides.</p>

  <h2>Key Features</h2>
  
  <h3>User Side</h3>
  <ul>
    <li><strong>Nearby Salon Search:</strong> Users can find nearby barbershops and browse available services.</li>
    <li><strong>Real-Time Slot Booking:</strong> Users can view and book available time slots based on their convenience.</li>
    <li><strong>Chat with Shopkeepers:</strong> Integrated chat using Socket.IO for seamless communication with shopkeepers.</li>
    <li><strong>Online Payment:</strong> Users can securely pay online through the app.</li>
    <li><strong>Reviews and Favorites:</strong> Users can rate shops, leave reviews, and add favorite shops for future reference.</li>
  </ul>

  <h3>Shopkeeper Side</h3>
  <ul>
    <li><strong>Shop Registration:</strong> Shopkeepers can register their shops and provide service details.</li>
    <li><strong>Manage Time Slots:</strong> Add or modify available time slots for appointments.</li>
    <li><strong>Booking Notifications:</strong> Get real-time notifications when users book slots.</li>
    <li><strong>Booking Management:</strong> Track all current and upcoming bookings in one place.</li>
  </ul>

  <h2>Tech Stack</h2>
  <h3>Backend</h3>
  <ul>
    <li>Node.js: Backend server setup.</li>
    <li>Express: API framework for managing routes and requests.</li>
    <li>MongoDB: Database for storing user, shop, and booking details.</li>
    <li>Socket.IO: Real-time communication for chat features.</li>
    <li>Cloudinary: Image storage for shop profile pictures.</li>
    <li>Twilio: Notifications and messaging.</li>
    <li>Authentication: JWT, Passport (Google OAuth), bcrypt for secure login and registration.</li>
  </ul>

  <h4>Backend Dependencies</h4>
  <p><code>bcrypt</code>, <code>bcryptjs</code>, <code>cloudinary</code>, <code>cors</code>, <code>dotenv</code>, <code>express</code>, <code>express-session</code>, <code>jsonwebtoken</code>, <code>mongoose</code>, <code>multer</code>, <code>nodemailer</code>, <code>passport</code>, <code>passport-google-oauth20</code>, <code>path</code>, <code>twilio</code></p>

  <h3>Frontend</h3>
  <ul>
    <li>React: Frontend library for building UI.</li>
    <li>Redux: State management for consistent UI updates.</li>
    <li>Socket.IO Client: Real-time communication for chat.</li>
    <li>Formik &amp; Yup: Form validation.</li>
    <li>Framer Motion: UI animations for smooth transitions.</li>
    <li>Axios: API calls.</li>
    <li>Flatpickr: Calendar picker for date selection.</li>
  </ul>

  <h4>Frontend Dependencies</h4>
  <p><code>axios</code>, <code>flatpickr</code>, <code>formik</code>, <code>framer-motion</code>, <code>lodash</code>, <code>lucide-react</code>, <code>react</code>, <code>react-dom</code>, <code>react-icons</code>, <code>react-redux</code>, <code>react-router-dom</code>, <code>react-scripts</code>, <code>redux</code>, <code>socket.io-client</code>, <code>three</code>, <code>web-vitals</code>, <code>yup</code></p>

  <h2>How to Run the Project</h2>
  <h4>Clone the repository:</h4>
  <pre><code>git clone https://github.com/your-username/barbezz.git
cd barbezz</code></pre>

  <h4>Install Dependencies:</h4>
  <ul>
    <li>Backend: <code>npm install</code> (in the root/backend folder)</li>
    <li>Frontend: <code>npm install</code> (in the frontend folder)</li>
  </ul>

  <h4>Set Up Environment Variables:</h4>
  <p>Create a <code>.env</code> file in the root directory for the backend and add configurations like database URL, JWT secret, and Cloudinary/Twilio API keys.</p>

  <h4>Start the Servers:</h4>
  <ul>
    <li>Backend: <code>npm run start</code></li>
    <li>Frontend: <code>npm start</code></li>
  </ul>

  <h4>Access the Application:</h4>
  <p>Open your browser and navigate to <a href="http://localhost:3000">http://localhost:3000</a>.</p>

  <h2>Future Improvements</h2>
  <ul>
    <li>Add more detailed analytics for shopkeepers on customer engagement.</li>
    <li>Introduce a loyalty program for frequent users.</li>
    <li>Add multilingual support for a broader user base.</li>
  </ul>

  <p>Enjoy a convenient and efficient way to book barbershop appointments with Barbezz!</p>
</body>
</html>
