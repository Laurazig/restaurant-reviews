import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewCtrl from "./reviews.controller.js"

const router = express.Router()
                                        //method
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

router
    .route("/review")
    .post(ReviewCtrl.apiPostReview)
    .put(ReviewCtrl.apiUpdateReview)
    .delete(ReviewCtrl.apiDeleteReview)

export default router