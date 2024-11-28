import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { generateToken } from "../../auth/service/tokenService.mjs";

import chalk from "chalk";
import { User } from '../../auth/model/userMongoose.mjs';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:9898/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            name: {
              first: profile.name.givenName,
              last: profile.name.familyName,
            },
            email: profile.emails[0].value,
            isBusiness: false,
            isAdmin: false,
            password: "", 
            image: {
              url: profile.photos[0]?.value || undefined, 
              alt: "Google user image",
            },
            address: {}, 
          });
        }

        const token = generateToken(user);
        console.log(chalk.magenta(`Google user token: ${token}`));

        return done(null, { user, token });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
passport.serializeUser((data, done) => {
   data.token = data.token;
  done(null, data.user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); 
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
