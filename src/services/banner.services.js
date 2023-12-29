const db = require("../models");
const _ = require("lodash");
const { uploadToCloudinary } = require("../utils/uploadFileCloud");

const createNewBanner = (data) => {
  const { tenBanner, moTaBanner, tinhTrang, hinhAnh } = data;
  return new Promise(async (resolve, reject) => {
    const uploadImage = await uploadToCloudinary(hinhAnh, "banner");
    const banner = await db.Banner.create({
      tenBanner: tenBanner,
      moTaBanner: moTaBanner,
      tinhTrang: tinhTrang,
      hinhAnh: uploadImage?.url,
    });
    if (banner) {
      resolve({ data: banner, message: "Tạo thành công" });
    } else {
      reject({ message: "Tạo không thành công" });
    }
  });
};

const getAllBanner = () => {
  return new Promise(async (resolve, reject) => {
    let banners = await db.Banner.findAll();
    if (banners) {
      resolve({ data: banners, message: "Success" });
    } else {
      reject({ message: "Lỗi hệ thống" });
    }
  });
};

const getBannerByID = (data) => {
  const { id } = data;
  return new Promise(async (resolve, reject) => {
    let banner = await db.Banner.findOne({
      where: {
        id: id,
      },
    });
    if (banner) {
      resolve({ data: banner, message: "Success" });
    } else {
      reject({ message: "Lỗi hệ thống" });
    }
  });
};

const updateBanner = (data) => {
  const { tenBanner, moTaBanner, tinhTrang, hinhAnh, id, reuploadImage } = data;
  // Check exits data
  return new Promise(async (resolve, reject) => {
    const banner = await db.Banner.findOne({ where: { id: id } });
    if (banner) {
      let image = banner?.hinhAnh;
      if (reuploadImage) {
        image = await uploadToCloudinary(hinhAnh, "banner");
      }
      banner.tenBanner = tenBanner || banner?.tenBanner;
      banner.moTaBanner = moTaBanner || banner.moTaBanner;
      banner.hinhAnh = image?.url || banner.hinhAnh;
      banner.tinhTrang = tinhTrang || banner?.tinhTrang;
      await banner.save();
      resolve({ data: banner, message: "Update successfull" });
    } else {
      reject({ data: {}, message: "Not found banner" });
    }
  });
};

const deleteBanner = async (data) => {
  return new Promise(async (resolve, reject) => {
    // Check exits data
    const banner = await db.Banner.findOne({ where: { id: data?.id } });
    if (banner) {
      await banner.destroy();
      resolve({ data: {}, message: "Delete successfull" });
    } else {
      reject({ data: null, message: "Not found banner" });
    }
  });
};

module.exports = { createNewBanner, getAllBanner, getBannerByID, updateBanner, deleteBanner };
