import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1080s", // 18 minutes
  });
  res.cookie("jwt", token, {
    maxAge: 3 * 60 * 1000, // 3 minute});
    httpOnly: true, // prevent xss cross-site scripting attacks (js cannot access)
    sameSite: "strict", // prevent csrf cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development", // only send cookie over https in production
    }
)};
export default generateTokenAndSetCookie;
