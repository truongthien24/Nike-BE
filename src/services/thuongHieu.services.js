const db = require("../models");
const _ = require("lodash");
const { uploadToCloudinary } = require("../utils/uploadFileCloud");

const createNewThuongHieu = (data) => {
  const { tenThuongHieu, moTaThuongHieu, tinhTrang, quocGia } = data;
  return new Promise(async (resolve, reject) => {
    const thuongHieu = await db.ThuongHieu.create({
      tenThuongHieu: tenThuongHieu,
      moTaThuongHieu: moTaThuongHieu,
      tinhTrang: tinhTrang,
      quocGia: quocGia,
    });
    if (thuongHieu) {
      resolve({ data: thuongHieu, message: "Tạo thành công" });
    } else {
      reject({ message: "Tạo không thành công" });
    }
  });
};

const getAllThuongHieu = () => {
  return new Promise(async (resolve, reject) => {
    let thuongHieus = await db.ThuongHieu.findAll();
    if (thuongHieus) {
      resolve({ data: thuongHieus, message: "Success" });
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

module.exports = { createNewThuongHieu, getAllThuongHieu, getBannerByID, updateBanner, deleteBanner };
