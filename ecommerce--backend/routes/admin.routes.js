const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  updateStaff,
  changePassword,
  addStaff,
  getAllStaff,
  deleteStaff,
  getStaffById,
  forgetPassword,
  confirmAdminEmail,
  confirmAdminForgetPass,
  addBanner,
  fetchBanners,
  getBannerById,
  updateBannerById,
  deleteBannerById
} = require("../controller/admin.controller");

//register a staff
router.post("/register", registerAdmin);

//login a admin
router.post("/login", loginAdmin);

//login a admin
router.patch("/change-password", changePassword);

//login a admin
router.post("/add", addStaff);

//login a admin
router.get("/all", getAllStaff);

//forget-password
router.patch("/forget-password", forgetPassword);

//forget-password
router.patch("/confirm-forget-password", confirmAdminForgetPass);

//get a staff
router.get("/get/:id", getStaffById);

// update a staff
router.patch("/update-stuff/:id", updateStaff);

// add banner 
router.post("/addBanner", addBanner);

// fetch Banners
router.get("/fetchBanners", fetchBanners);

// get banner by id
router.get("/getBanner/:id", getBannerById);

// update banner by id
router.patch("/updateBanner/:id", updateBannerById);

//delete banner by id
router.delete("/deleteBanner/:id", deleteBannerById);

//update staf status
// router.put("/update-status/:id", updatedStatus);

//delete a staff
router.delete("/:id", deleteStaff);

module.exports = router;
