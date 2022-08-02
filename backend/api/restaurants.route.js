import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"

const router = express.Router()

router.route("/").get((req,res) => res.send("hello world"))

export default router