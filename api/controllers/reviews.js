const mongoose = require("mongoose");

const Review = require("../models/reviews");

exports.reviews_get_all = (req, res, next) => {
    Review.find()
        .then(reviews => {
            console.log("Znalezione opinie:", reviews);
            res.status(200).json(reviews);
        })
        .catch(err => {
            console.error("Błąd zapytania do MongoDB:", err);
            res.status(500).json({ error: err.message });
        });
};

exports.reviews_add_new = (req, res, next) => {
    const newreview = new Review({
        _id: new mongoose.Types.ObjectId(),
        classname: req.body.classname,
        review: req.body.review,
        rating: req.body.rating,
        author: req.body.author,
        date: req.body.date || new Date()
    });

    newreview.save()
        .then(result => {
            res.status(201).json({
                wiadomość: "Utworzono nową opinię.",
                dane: result
            });
        })
        .catch(err => res.status(500).json({ wiadomość: "Wystąpił błąd podczas tworzenia opinii.", błąd: err.message }));
};

exports.reviews_get_by_id = (req, res, next) => {
    const id = req.params.reviewId;
    Review.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ wiadomość: "Nie znaleziono opinii o podanym ID." });
            }

            res.status(200).json({
                wiadomość: "Szczegóły opinii odnośnie zajęć tanecznych o numerze: " + id,
                dane: result
            });
        })
        .catch(err => res.status(500).json({ wiadomość: err }));
};

exports.reviews_update = (req, res, next) => {
    const id = req.params.reviewId;

    const updatedData = {
        classname: req.body.classname,
        review: req.body.review,
        rating: req.body.rating,
        author: req.body.author,
        date: req.body.date
    };

    Review.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
        .then(updatedReview => {
            if (!updatedReview) {
                return res.status(404).json({ wiadomość: "Nie znaleziono opinii o podanym ID do aktualizacji." });
            }

            res.status(200).json({
                wiadomość: "Zaktualizowano dane opinii odnośnie zajęć tanecznych o numerze: " + id,
                dane: updatedReview,
            });
        })
        .catch(err => {
            console.error("Błąd podczas aktualizacji opinii odnośnie zajęć tanecznych:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas aktualizacji opinii odnośnie zajęć tanecznych.", błąd: err.message });
        });
};

exports.reviews_patch = (req, res, next) => {
    console.log("Wywołano funkcję reviews_patch");
    const id = req.params.reviewId;
    const patchData = req.body;

    Review.findByIdAndUpdate(id, patchData, { new: true, runValidators: true })
        .then(updatedReview => {
            if (!updatedReview) {
                return res.status(404).json({ wiadomość: "Nie znaleziono opinii odnośnie zajęć tanecznych o podanym ID do aktualizacji." });
            }
            res.status(200).json({
                wiadomość: "Częściowo zaktualizowano dane opinii odnośnie zajęć tanecznych o numerze: " + id,
                dane: updatedReview,
            });
        })
        .catch(err => {
            console.error("Błąd podczas częściowej aktualizacji opinii odnośnie zajęć tanecznych:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas częściowej aktualizacji opinii odnośnie zajęć tanecznych.", błąd: err.message });
        });
};

exports.reviews_delete = (req, res, next) => {
    const id = req.params.reviewId;

    Review.findByIdAndDelete(id)
        .then(deletedReview => {
            if (!deletedReview) { 
                return res.status(404).json({ wiadomość: "Nie znaleziono opinii odnośnie zajęć tanecznych o podanym ID do usunięcia." });
            }

            res.status(200).json({ wiadomość: "Usunięto opinię odnośnie zajęć tanecznych o numerze: " + id });
        })
        .catch(err => {
            console.error("Błąd podczas usuwania opinii odnośnie zajęć tanecznych:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas usuwania opinii odnośnie zajęć tanecznych.", błąd: err.message });
        });
};

exports.reviews_head = (req, res, next) => {
    const id = req.params.reviewId;

    Review.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ wiadomość: "Nie znaleziono opinii odnośnie zajęć tanecznych o podanym ID." });
            }

            res.status(200).set({
                "Content-Type": "application/json",
                "Content-Length": JSON.stringify(result).length,
            }).end();
        })
        .catch(err => {
            console.error("Błąd podczas obsługi żądania HEAD:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas obsługi żądania HEAD.", błąd: err.message });
        });
};

exports.handleOptions = (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.status(204).send();
};

