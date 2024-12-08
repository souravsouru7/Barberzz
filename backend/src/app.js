const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const WebSocket = require('ws');
const WebSocketService = require('./infrastructure/external-services/WebSocketService');

const app = express();
const server = http.createServer(app);

// Initialize WebSocket server
const webSocketService = new WebSocketService(server);
global.webSocketService = webSocketService;
app.set('webSocketService', webSocketService);

// Import routes
const shopkeeperRoutes = require('./interfaces/routes/ShopkeeperRoutes');
const initializeAdmin = require('./infrastructure/db/initializeAdmin');
const adminRoutes = require('./interfaces/routes/adminRoutes');
const shopRoutes = require('./interfaces/routes/ShopRoutes');
const bookingRoutes = require('./interfaces/routes/bookingRoutes');
const paymentRoutes = require('./interfaces/routes/paymentRoutes');
const SlotRoutes = require('./interfaces/routes/slotRoutes');
const UserRoutes = require("./interfaces/routes/UserRoutes");
const createChatRouter = require("./interfaces/routes/chatRoutes");
const NotificationRoutes = require("./interfaces/routes/notification.routes");
const analyticsRoutes = require("./interfaces/routes/analytics.routes");
const reviewRoutes = require('./interfaces/routes/reviewRoutes');

// Allowed origins
const ALLOWED_ORIGINS = [
    'https://barberzfrotnend.vercel.app',
    'http://localhost:3000',  // Add local development URL if needed
    'https://www.barbezz.shop'
];

// Comprehensive CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked CORS for:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'X-Requested-With', 
        'Accept', 
        'Origin'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false
};

// Middleware Stack
app.use(cors(corsOptions));  // CORS must be first
app.use(helmet());  // Add security headers
app.use(express.json({ limit: '10mb' }));  // Increase payload size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Additional CORS and security middleware
app.use((req, res, next) => {
    // Log incoming request origin for debugging
    console.log('Request Origin:', req.get('origin'));
    
    // Set CORS headers manually as a fallback
    res.header('Access-Control-Allow-Origin', req.get('origin') || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// Database connection
const dbUri = process.env.DB_URI;
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err.message));

// Routes
app.use('/api/auth', require('./interfaces/routes/authRoutes'));
app.use('/api/shopkeepers', shopkeeperRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/slots', SlotRoutes);
app.use('/api/chat', createChatRouter(webSocketService));
app.use('/api', UserRoutes);
app.use("/api/notifications", NotificationRoutes);
app.use('/api', reviewRoutes);
app.use('/api', analyticsRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Allowed origins: ${ALLOWED_ORIGINS.join(', ')}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});
