import { request, response } from "express";
import productDao from "../daos/product.dao.js";
import cartDao from "../daos/cart.dao.js";

export const checkProductAndCart = async (req = request, res = response, next) => {
  try {
    const { cid, pid } = req.params;

    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "error", msg: "Product not found" });

    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "error", msg: "Cart not found" });

    next();

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}