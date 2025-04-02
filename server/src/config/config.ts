import * as path from 'path'
const envFilePath = path.resolve(process.cwd(), '.env');
require('dotenv').config({ path: envFilePath });


export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  security: {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10),
    defaultPassword: process.env.DEFAULT_PASS,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  ui: {
    resetPasswordLink: process.env.RESET_PASS_UI_LINK,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  admin: {
    superAdminPassword: process.env.SUPER_ADMIN_PASSWORD,
  },
});
