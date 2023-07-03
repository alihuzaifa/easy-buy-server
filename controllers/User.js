import User from "../models/User.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/GenerateToken.js";
import nodemailer from 'nodemailer'
const login = async (req, res) => {
  try {
    const { email, password } = req?.body;
    if (!email || !password) { return res.status(400).json({ message: "All data is required" }) }
    const LoginUser = await User.findOne({ email });
    if (LoginUser) {
      const comparePassword = await bcrypt.compare(password, LoginUser?.password);
      if (comparePassword) {
        const token = generateToken(LoginUser);
        LoginUser.token = token;
        const { password, ...userData } = LoginUser.toObject();
        await LoginUser.save();
        return res.status(200).json(userData);
      } else { res.status(404).json({ message: "Invalid email or password" }) }
    }
  } catch (error) { return res.status(500).json({ message: error?.message }) }
};
const signup = async (req, res) => {
  console.log('enter')
  const { name, email, password, phone } = req?.body;
  try {
    if (!email || !password || !name || !phone) { return res.status(400).json({ message: "All data is required" }) }
    const checkUser = await User.findOne({ email })
    if (checkUser) { return res.status(401).json({ message: "User already exist" }) }
    else {
      const salt = await bcrypt.genSalt(10);
      const convertPasswordIntoHash = await bcrypt.hash(password, salt);
      const userObj = { email, password: convertPasswordIntoHash, name, cart: [], token: '', phone };
      let newUser = await User.create(userObj);
      console.log("🚀 newUser:", newUser)
      if (newUser) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log("🚀  otp:", otp)
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD },
        });
        console.log(" transporter:", transporter)
        const mailOptions = {
          from: '"Takeaway" alihuzaifazahid786@gmail.com',
          to: req?.body?.email,
          subject: 'OTP Verification',
          text: `Here is your OTP ${otp} for verification`,
        };
        console.log("mailOptions:", mailOptions)
        await transporter.sendMail(mailOptions);
        const { _id, email, name } = newUser;
        const token = generateToken({ _id, email, name });
        newUser.token = token;
        newUser.otp = otp;
        await newUser.save();
        return res.status(200).json(newUser);
      }
    }
  } catch (error) { return res.status(500).json({ message: error?.message }) }
};
const sendOtp = async (req, res) => {
  const { email } = req?.body;
  try {
    if (!email) { return res.status(400).json({ message: "All data is required" }) }
    const checkUser = await User.findOne({ email })
    if (checkUser) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD } });
      const mailOptions = {
        from: '"Takeaway" alihuzaifazahid786@gmail.com',
        to: req?.body?.email,
        subject: 'OTP Verification',
        text: `Here is your OTP ${otp} for verification`,
      };
      await transporter.sendMail(mailOptions);
      checkUser.otp = otp
      await checkUser.save()
      return res.status(200).json({ message: 'Otp send to your email' });
    }
  } catch (error) { return res.status(500).json({ message: error?.message }) }
};
const checkOtp = async (req, res) => {
  const { email, otp } = req?.body;
  try {
    if (!email) { return res.status(400).json({ message: "All data is required" }) }
    const checkUser = await User.findOne({ email })
    if (checkUser) {
      if (checkUser.otp == otp) { return res.status(200).json({ message: 'Otp matched successfully' }) }
      else { return res.status(400).json({ message: 'Invalid Otp' }) }
    }
  } catch (error) { return res.status(500).json({ message: error?.message }) }
};
const updatePass = async (req, res) => {
  const { password, confirmPassword, email } = req?.body
  try {
    if (!password || !confirmPassword, !email) return res.status(400).json({ message: "All data is required" })
    if (password.toLowerCase() === confirmPassword.toLowerCase()) {
      const user = await User.findOne({ email })
      const salt = await bcrypt.genSalt(10);
      const convertPasswordIntoHash = await bcrypt.hash(password, salt);
      user.password = convertPasswordIntoHash
      await user.save()
      return res.status(200).json(user)
    } else { return res.status(400).json({ message: "Password is not matching" }) }
  } catch (error) { return res.status(500).json({ message: error?.message }) }
};
export { login, signup, sendOtp, checkOtp, updatePass }
