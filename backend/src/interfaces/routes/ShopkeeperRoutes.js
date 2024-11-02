const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const upload = multer({ dest: 'uploads/' });

// Inject dependencies
const ShopkeeperRepositoryMongo = require('../../infrastructure/db/ShopkeeperRepositoryMongo');
const RegisterShopkeeper = require('../../application/use-case/shopkeeper/RegisterShopkeeper');
const LoginShopkeeper = require('../../application/use-case/shopkeeper/LoginShopkeeperUseCase');
const GetShopkeeperById = require('../../application/use-case/shopkeeper/GetShopkeeperById');
const UpdateShopkeeper = require('../../application/use-case/shopkeeper/UpdateShopkeeperUseCase');
const HashService = require('../../application/services/HashService');
const TokenService = require('../../application/services/TokenService');
const CloudinaryService = require('../../infrastructure/external-services/CloudinaryService');
const GoogleAuthService = require('../../application/services/GoogleAuthService'); // New import
const ShopkeeperController = require('../controllers/ShopkeeperController');

// Initialize services and use cases
const shopkeeperRepository = new ShopkeeperRepositoryMongo();
const hashService = new HashService();
const tokenService = new TokenService();
const cloudinaryService = new CloudinaryService();

// Initialize Google Auth Service
const googleAuthService = new GoogleAuthService(
  shopkeeperRepository,
  hashService,
  tokenService
);

// Use cases
const registerShopkeeperUseCase = new RegisterShopkeeper(shopkeeperRepository, hashService);
const loginShopkeeperUseCase = new LoginShopkeeper(shopkeeperRepository, hashService, tokenService);
const getShopkeeperByIdUseCase = new GetShopkeeperById(shopkeeperRepository);
const updateShopkeeperUseCase = new UpdateShopkeeper(shopkeeperRepository, cloudinaryService);

const shopkeeperController = new ShopkeeperController(
  registerShopkeeperUseCase,
  loginShopkeeperUseCase,
  getShopkeeperByIdUseCase,
  updateShopkeeperUseCase,
  googleAuthService // Pass the Google auth service to the controller
);

// Regular authentication routes
router.post('/register', (req, res) => shopkeeperController.register(req, res));
router.post('/login', (req, res) => shopkeeperController.login(req, res));
router.get('/:id', (req, res) => shopkeeperController.getShopkeeperById(req, res));
router.put('/:id', upload.single('profileImage'), (req, res) => shopkeeperController.updateShopkeeper(req, res));


router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/shopkeeper/login' }),
  (req, res) => {
    try {
      const token = req.user.token;
      const shopkeeper = req.user.shopkeeper;
      
      // Redirect to the frontend auth-callback route with token and shopkeeper data
      const redirectUrl = `${process.env.FRONTEND_URL}/auth-callback?token=${token}&shopkeeper=${encodeURIComponent(JSON.stringify(shopkeeper))}`;
      res.redirect(redirectUrl);
    } catch (error) {
      res.redirect(`${process.env.FRONTEND_URL}/shopkeeper/login?error=Authentication failed`);
    }
  }
);


module.exports = router;