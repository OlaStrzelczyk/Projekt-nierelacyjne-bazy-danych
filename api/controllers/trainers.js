const mongoose = require("mongoose");

// Import model
const Trainer = require("../models/trainers");

exports.trainers_get_all = (req, res, next) => {
    Trainer.find()
        .then(trainers => {
            console.log("Znalezieni trenerzy:", trainers);
            res.status(200).json(trainers);
        })
        .catch(err => {
            console.error("Błąd zapytania do MongoDB:", err);
            res.status(500).json({ error: err.message });
        });
};

exports.trainers_add_new = (req, res, next) => {
    const newtrainer = new Trainer({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        bio: req.body.bio,
        experience: req.body.experience,
        contact: req.body.contact,
        rating: req.body.rating
    });

    newtrainer.save()
        .then(result => {
            res.status(201).json({
                wiadomość: "Utworzono nowego trenera.",
                dane: result
            });
        })
        .catch(err => {
            console.error("Błąd podczas tworzenia trenera:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas tworzenia trenera.", błąd: err.message });
        });
};

exports.trainers_get_by_id = (req, res, next) => {
    const id = req.params.trainerId;
    Trainer.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ wiadomość: "Nie znaleziono trenera o podanym ID." });
            }

            res.status(200).json({
                wiadomość: "Szczegóły trenera o numerze: " + id,
                dane: result
            });
        })
        .catch(err => res.status(500).json({ wiadomość: err }));
};

exports.trainers_update = (req, res, next) => {
    const id = req.params.trainerId;

    const updatedData = {
        name: req.body.name,
        expertise: req.body.expertise,
        bio: req.body.bio,
        experience: req.body.experience,
        contact: req.body.contact,
        rating: req.body.rating
    };

    Trainer.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
        .then(updatedTrainer => {
            if (!updatedTrainer) {
                return res.status(404).json({ wiadomość: "Nie znaleziono trenera o podanym ID do aktualizacji." });
            }

            res.status(200).json({
                wiadomość: "Zaktualizowano dane trenera o numerze: " + id,
                dane: updatedTrainer,
            });
        })
        .catch(err => {
            console.error("Błąd podczas aktualizacji trenera:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas aktualizacji trenera.", błąd: err.message });
        });
};

exports.trainers_patch = (req, res, next) => {
    const id = req.params.trainerId;

    const patchData = req.body;

    Trainer.findByIdAndUpdate(id, patchData, { new: true, runValidators: true })
        .then(updatedTrainer => {
            if (!updatedTrainer) {
                return res.status(404).json({ wiadomość: "Nie znaleziono trenera o podanym ID do aktualizacji." });
            }

            res.status(200).json({
                wiadomość: "Częściowo zaktualizowano dane trenera o numerze: " + id,
                dane: updatedTrainer,
            });
        })
        .catch(err => {
            console.error("Błąd podczas częściowej aktualizacji trenera:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas częściowej aktualizacji trenera.", błąd: err.message });
        });
};

exports.trainers_delete = (req, res, next) => {
    const id = req.params.trainerId;

    Trainer.findByIdAndDelete(id)
        .then(deletedTrainer => {
            if (!deletedTrainer) {
                return res.status(404).json({ wiadomość: "Nie znaleziono trenera o podanym ID do usunięcia." });
            }

            res.status(200).json({ wiadomość: "Usunięto trenera o numerze: " + id });
        })
        .catch(err => {
            console.error("Błąd podczas usuwania trenera:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas usuwania trenera.", błąd: err.message });
        });
};

exports.trainers_head = (req, res, next) => {
    const id = req.params.trainerId;

    Trainer.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ wiadomość: "Nie znaleziono trenera o podanym ID." });
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
