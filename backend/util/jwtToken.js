import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1080s", // 18 minutes
  });
  res.cookie("jwt", token, {
    maxAge: 30 * 60 * 1000, // 3 minute});
    httpOnly: true, // prevent xss cross-site scripting attacks (js cannot access)
    secure: true, // set to true in production (https)
    sameSite: "None", // prevent csrf attacks "None" in production with https
    // secure: false, // set to false in deployment (http)
    // sameSite: "strict", // prevent csrf attacks "strict" in development with http
    }
)};
export default generateTokenAndSetCookie;
