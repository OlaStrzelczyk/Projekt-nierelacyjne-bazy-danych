const mongoose = require("mongoose");

const Class = require("../models/classes");

exports.classes_get_all = (req, res, next) => {
    Class.find()
        .then(classes => {
            console.log("Znalezione klasy:", classes);
            res.status(200).json(classes);
        })
        .catch(err => {
            console.error("Błąd zapytania do MongoDB:", err);
            res.status(500).json({ error: err.message });
        });
};

exports.classes_add_new = (req, res, next) => {
    const newclass = new Class({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        level: req.body.level,
        school: req.body.school,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time,
        trainer: req.body.trainer,
        review: req.body.review
    });

    newclass.save()
        .then(result => {
            res.status(201).json({
                wiadomość: "Utworzono nowe zajęcia.",
                dane: result
            });
        })
        .catch(err => res.status(500).json({ wiadomość: "Wystąpił błąd podczas tworzenia zajęć.", błąd: err.message }));
};

exports.classes_get_by_id = (req, res, next) => {
    const id = req.params.classId;
    Class.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ wiadomość: "Nie znaleziono zajęć o podanym ID." });
            }

            res.status(200).json({
                wiadomość: "Szczegóły zajęć tanecznych o numerze: " + id,
                dane: result
            });
        })
        .catch(err => res.status(500).json({ wiadomość: err }));
};

exports.classes_update = (req, res, next) => {
    const id = req.params.classId;

    const updatedData = {
        name: req.body.name,
        price: req.body.price,
        level: req.body.level,
        school: req.body.school,
        date: req.body.date,
        time: req.body.time,
        trainer: req.body.trainer,
        review: req.body.review,
    };

    Class.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
        .then(updatedClass => {
            if (!updatedClass) {
                return res.status(404).json({ wiadomość: "Nie znaleziono zajęć o podanym ID do aktualizacji." });
            }

            res.status(200).json({
                wiadomość: "Zaktualizowano dane zajęć tanecznych o numerze: " + id,
                dane: updatedClass,
            });
        })
        .catch(err => {
            console.error("Błąd podczas aktualizacji zajęć:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas aktualizacji zajęć.", błąd: err.message });
        });
};

exports.classes_patch = (req, res, next) => {
    const id = req.params.classId;

    const patchData = req.body;

    Class.findByIdAndUpdate(id, patchData, { new: true, runValidators: true })
        .then(updatedClass => {
            if (!updatedClass) {
                return res.status(404).json({ wiadomość: "Nie znaleziono zajęć o podanym ID do aktualizacji." });
            }

            res.status(200).json({
                wiadomość: "Częściowo zaktualizowano dane zajęć tanecznych o numerze: " + id,
                dane: updatedClass,
            });
        })
        .catch(err => {
            console.error("Błąd podczas częściowej aktualizacji zajęć:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas częściowej aktualizacji zajęć.", błąd: err.message });
        });
};

exports.classes_delete = (req, res, next) => {
    const id = req.params.classId;

    Class.findByIdAndDelete(id)
        .then(deletedClass => {
            if (!deletedClass) {
                return res.status(404).json({ wiadomość: "Nie znaleziono zajęć o podanym ID do usunięcia." });
            }

            res.status(200).json({ wiadomość: "Usunięto zajęcia taneczne o numerze: " + id });
        })
        .catch(err => {
            console.error("Błąd podczas usuwania zajęć:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas usuwania zajęć.", błąd: err.message });
        });
};

exports.classes_head = (req, res, next) => {
    const id = req.params.classId;

    Class.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ wiadomość: "Nie znaleziono zajęć o podanym ID." });
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
