import { Router } from "express";
import productDao from "../daos/product.dao.js";
import { io } from "../app.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productDao.getAll();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productDao.getAll();
  io.on("connection", (socket) => {
    console.log(`New client connected in Realtime Products with ID: ${socket.id}`);
    socket.emit("products", products);
  });

  res.render("realTimeProducts");
});

router.post("/realtimeproducts", async (req, res) => {
  await productDao.create(req.body);
  const products = await productDao.getAll();
  io.emit("products", products);

  res.render("realTimeProducts");
});

router.delete("/realtimeproducts", async (req, res) => {
  const { id } = req.body;
  await productDao.deleteOne(id);
  const products = await productDao.getAll();
  io.emit("products", products);
  res.render("realTimeProducts");
});

export default router;
