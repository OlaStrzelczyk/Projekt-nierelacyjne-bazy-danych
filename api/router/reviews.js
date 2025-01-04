const express = require("express"); 

const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const ReviewController = require("../controllers/reviews");

// Endpoints
router.get("/", ReviewController.reviews_get_all);

router.post("/", checkAuth, ReviewController.reviews_add_new);

router.get("/:reviewId", ReviewController.reviews_get_by_id);

router.put("/:reviewId", checkAuth, ReviewController.reviews_update);

router.patch("/:reviewId", checkAuth, ReviewController.reviews_patch); 

router.delete("/:reviewId", checkAuth, ReviewController.reviews_delete);

router.head("/:reviewId", checkAuth, ReviewController.reviews_head);

router.options("/:reviewId", (req, res) => {
    res.setHeader("Allow", "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD");
    res.status(204).send(); 
});

module.exports = router;
