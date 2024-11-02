const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

class GoogleAuthService {
  constructor(shopkeeperRepository, hashService, tokenService) {
    this.shopkeeperRepository = shopkeeperRepository;
    this.hashService = hashService;
    this.tokenService = tokenService;
    
    this.initializeGoogleStrategy();
  }

  initializeGoogleStrategy() {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/api/shopkeepers/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let shopkeeper = await this.shopkeeperRepository.findByEmail(profile.emails[0].value);

            if (!shopkeeper) {
    
              const randomPassword = Math.random().toString(36).slice(-8);
              const hashedPassword = await this.hashService.hash(randomPassword);
              
              shopkeeper = await this.shopkeeperRepository.createShopkeeper({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: hashedPassword,
                contactNumber: "",
                googleId: profile.id,
                profileImage: profile.photos[0]?.value
              });
            }

            const token = this.tokenService.generateToken({
              id: shopkeeper._id,
              email: shopkeeper.email
            });

            done(null, { shopkeeper, token });
          } catch (error) {
            done(error, null);
          }
        }
      )
    );
  }
}

module.exports = GoogleAuthService;