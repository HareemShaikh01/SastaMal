const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const jwt = require('jsonwebtoken');
const { tokenForVerify } = require("../config/auth");
const Admin = require("../model/Admin");
const { generateToken } = require("../utils/token");
const { sendEmail } = require("../config/email");
const { secret } = require("../config/secret");
const Banner = require("../model/Banner");

// register
const registerAdmin = async (req, res, next) => {
  try {
    const isAdded = await Admin.findOne({ email: req.body.email });
    if (isAdded) {
      return res.status(403).send({
        message: "This Email already Added!",
      });
    } else {
      const newStaff = new Admin({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password),
      });
      const staff = await newStaff.save();
      const token = generateToken(staff);
      res.status(200).send({
        token,
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        joiningData: Date.now(),
      });
    }
  } catch (err) {
    next(err)
  }
};

const loginAdmin = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(403).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { _id: admin._id, email: admin.email, role: 'Admin' },
      secret.token_secret,
      { expiresIn: '2d' }
    );

    // Send the token
    res.json({ token });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: 'Server error' });
  }
};



// forget password
const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(404).send({
        message: "Admin Not found with this email!",
      });
    } else {
      const token = tokenForVerify(admin);
      const body = {
        from: secret.email_user,
        to: `${email}`,
        subject: "Password Reset",
        html: `<h2>Hello ${email}</h2>
        <p>A request has been received to change the password for your <strong>Shofy</strong> account </p>

        <p>This link will expire in <strong> 10 minute</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for reset your password</p>

        <a href=${secret.admin_url}/forget-password/${token} style="background:#0989FF;color:white;border:1px solid #0989FF; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password</a>

        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@shofy.com</p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>Shofy Team</strong>
        `,
      };
      admin.confirmationToken = token;
      const date = new Date();
      date.setDate(date.getDate() + 1);
      admin.confirmationTokenExpires = date;
      await admin.save({ validateBeforeSave: false });
      const message = "Please check your email to reset password!";
      sendEmail(body, res, message);
    }
  } catch (error) {
    next(error)
  }
};
// confirm-forget-password
const confirmAdminForgetPass = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const admin = await Admin.findOne({ confirmationToken: token });

    if (!admin) {
      return res.status(403).json({
        status: "fail",
        message: "Invalid token",
      });
    }

    const expired = new Date() > new Date(user.confirmationTokenExpires);

    if (expired) {
      return res.status(401).json({
        status: "fail",
        message: "Token expired",
      });
    } else {
      const newPassword = bcrypt.hashSync(password);
      await Admin.updateOne(
        { confirmationToken: token },
        { $set: { password: newPassword } }
      );

      admin.confirmationToken = undefined;
      admin.confirmationTokenExpires = undefined;

      await admin.save({ validateBeforeSave: false });

      res.status(200).json({
        message: "Password reset successfully",
      });
    }
  } catch (error) {
    next(error)
  }
};

// change password
const changePassword = async (req, res, next) => {
  try {
    const { email, oldPass, newPass } = req.body || {};
    const admin = await Admin.findOne({ email: email });
    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (!bcrypt.compareSync(oldPass, admin.password)) {
      return res.status(401).json({ message: "Incorrect current password" });
    }
    else {
      const hashedPassword = bcrypt.hashSync(newPass);
      await Admin.updateOne({ email: email }, { password: hashedPassword })
      res.status(200).json({ message: "Password changed successfully" });
    }
  } catch (error) {
    next(error)
  }
}
// reset Password
const resetPassword = async (req, res) => {
  const token = req.body.token;
  const { email } = jwt.decode(token);
  const staff = await Admin.findOne({ email: email });

  if (token) {
    jwt.verify(token, secret.jwt_secret_for_verify, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          message: "Token expired, please try again!",
        });
      } else {
        staff.password = bcrypt.hashSync(req.body.newPassword);
        staff.save();
        res.send({
          message: "Your password change successful, you can login now!",
        });
      }
    });
  }
};
// add staff
const addStaff = async (req, res, next) => {
  try {
    const isAdded = await Admin.findOne({ email: req.body.email });
    if (isAdded) {
      return res.status(500).send({
        message: "This Email already Added!",
      });
    } else {
      const newStaff = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        phone: req.body.phone,
        joiningDate: req.body.joiningDate,
        role: req.body.role,
        image: req.body.image,
      });
      await newStaff.save();
      res.status(200).send({
        message: "Staff Added Successfully!",
      });
    }
  } catch (err) {
    next(err)
  }
};
// get all staff
const getAllStaff = async (req, res, next) => {
  try {
    const admins = await Admin.find({}).sort({ _id: -1 });
    res.status(200).json({
      status: true,
      message: 'Staff get successfully',
      data: admins
    });
  } catch (err) {
    next(err)
  }
};
// getStaffById
const getStaffById = async (req, res, next) => {

  try {
    const admin = await Admin.findById(req.params.id);
    res.send(admin);
  } catch (err) {
    next(err)
  }
};
// updateStaff
const updateStaff = async (req, res) => {
  try {
    const admin = await Admin.findOne({ _id: req.params.id });
    if (admin) {
      admin.name = req.body.name;
      admin.email = req.body.email;
      admin.phone = req.body.phone;
      admin.role = req.body.role;
      admin.joiningData = req.body.joiningDate;
      admin.image = req.body.image;
      admin.password =
        req.body.password !== undefined
          ? bcrypt.hashSync(req.body.password)
          : admin.password;
      const updatedAdmin = await admin.save();
      const token = generateToken(updatedAdmin);
      res.send({
        token,
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
        image: updatedAdmin.image,
        phone: updatedAdmin.phone,
      });
    } else {
      res.status(404).send({
        message: "This Staff not found!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
// deleteStaff
const deleteStaff = async (req, res, next) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Admin Deleted Successfully',
    });
  } catch (err) {
    next(err)
  }
};

const updatedStatus = async (req, res) => {
  try {
    const newStatus = req.body.status;

    await Admin.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    res.send({
      message: `Store ${newStatus} Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
// Add a new banner
const addBanner = async (req, res, next) => {
  try {
    const isAdded = await Banner.findOne({ title: req.body.title });  // checking if the title already exists
    if (isAdded) {
      return res.status(500).send({
        message: "The Banner with the same Title already Added!",
      });
    }

    const newBanner = new Banner({
      pre_title: {
        text: req.body.pre_title?.text,  // Text is optional
        price: req.body.pre_title?.price,  // Price is optional
      },
      title: req.body.title,  // main title is required
      subtitle: {
        text_1: req.body.subtitle?.text_1,  // text_1 is optional
        percent: req.body.subtitle?.percent,  // percent is optional
        text_2: req.body.subtitle?.text_2,  // text_2 is optional
      },
      img: req.body.img,  // main image URL (required)
      green_bg: req.body.green_bg ?? true,  // boolean flag (optional)
      is_light: req.body.is_light ?? false,  // boolean flag (optional)
      btn_link: req.body.btn_link,  // optional
    });

    await newBanner.save();
    res.status(200).json({
      message: "Banner Added Successfully!",
    });
  } catch (err) {
    next(err); // Pass error to the next middleware
  }
};

// Fetch all banners
const fetchBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find({});  // Retrieves all banners from the database

    return res.status(200).json({
      status: true,
      message: 'Banners fetched successfully',
      data: banners,  // Returning the fetched banners here
    });
  } catch (err) {
    next(err);  // Pass the error to the next middleware if there is an error
  }
};

// Get banner by ID
const getBannerById = async (req, res, next) => {
  const { id } = req.params;  // ID from the request parameters

  try {
    const banner = await Banner.findById(id);  // Find banner by ID
    if (!banner) {
      return res.status(404).json({
        status: false,
        message: 'Banner not found',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Banner fetched successfully',
      data: banner,  // Returning the fetched banner here
    });

  } catch (error) {
    next(error);  // Pass error to the next middleware
  }
};

// Update banner by ID
const updateBannerById = async (req, res, next) => {
  const { id } = req.params;
  const { pre_title, title, subtitle, img, green_bg, is_light, btn_link } = req.body || {};  // Destructuring the required fields

  try {
    const updatedBanner = await Banner.findByIdAndUpdate(id, {
      pre_title: {
        text: pre_title?.text,  // Handling pre_title text and price
        price: pre_title?.price,
      },
      title,  // main title (required)
      subtitle: {
        text_1: subtitle?.text_1,  // Handling subtitle text_1, percent, text_2
        percent: subtitle?.percent,
        text_2: subtitle?.text_2,
      },
      img,  // main image URL (required)
      green_bg: green_bg ?? true,  // boolean flag (optional)
      is_light: is_light ?? false,  // boolean flag (optional)
      btn_link,  // optional
    }, { new: true });  // Return the updated banner

    if (!updatedBanner) {
      return res.status(404).json({
        status: false,
        message: 'Banner not found',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Banner updated successfully',
      data: updatedBanner,  // Returning the updated banner
    });

  } catch (error) {
    next(error);  // Pass error to the next middleware
  }
};

// delete banner by id

const deleteBannerById = async (req, res, next) => {

  const { id } = req.params;  // ID from the request parameters

  try {
    const deletedBanner = await Banner.findByIdAndDelete(id);  // Find and delete banner by ID
    if (!deletedBanner) {
      return res.status(404).json({
        status: false,
        message: 'Banner not found',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Banner deleted successfully',
    });

  } catch (error) {
    next(error);  // Pass error to the next middleware
  }

}


module.exports = {
  registerAdmin,
  loginAdmin,
  forgetPassword,
  resetPassword,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  updatedStatus,
  changePassword,
  confirmAdminForgetPass,
  addBanner,
  fetchBanners,
  getBannerById,
  updateBannerById,
  deleteBannerById

};
