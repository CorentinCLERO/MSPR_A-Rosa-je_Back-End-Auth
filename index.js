const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Charger les variables d'environnement

const app = express();
app.use(bodyParser.json());

const secretKey = process.env.SECRET_JWT;

const rolePermissions = {
  "owner": 1,
  "keeper": 2,
  "botanist": 3,
  "admin": 4
};

// Contrôleur utilisateur
const controllerUser = require("../controllers/controllerUser.js");

// Routes d'authentification
const router = express.Router();
router.post("/login_user", controllerUser.loginUser);
router.post("/verify_token", controllerUser.verifyToken);

// Route pour vérifier les rôles
router.post("/verify_role", (req, res) => {
  const token = req.body.token;
  const requiredRole = req.body.requiredRole;

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userFromDB = { id: decoded.id, role: decoded.role };

    if (rolePermissions[userFromDB.role] >= rolePermissions[requiredRole]) {
      res.json({ valid: true, decoded });
    } else {
      res.status(403).json({ message: "Access denied. Insufficient role." });
    }
  } catch (error) {
    res.status(418).json({
      message: "Invalid token.",
      error: process.env.NODE_ENV === "development" ? {
        message: error.message,
        stack: error.stack,
        token: token,
        details: error.details || "No additional details"
      } : undefined
    });
  }
});

app.use("/api/auth", router);

const PORT = process.env.AUTH_PORT || 8081;
app.listen(PORT, () => {
  console.log(`Auth server is running on port ${PORT}.`);
});
