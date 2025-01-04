const mongoose = require("mongoose");

// Import model
const School = require("../models/schools");

exports.schools_get_all = (req, res, next) => {
    School.find()
        .then(schools => {
            console.log("Znalezione szkoły tańca:", schools);
            res.status(200).json(schools);
        })
        .catch(err => {
            console.error("Błąd zapytania do MongoDB:", err);
            res.status(500).json({ error: err.message });
        });
};

exports.schools_add_new = (req, res, next) => {
    const newschool = new School({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        contact: req.body.contact
    });

    newschool.save()
        .then(result => {
            res.status(201).json({
                wiadomość: "Utworzono nową szkołę.",
                dane: result
            });
        })
        .catch(err => res.status(500).json({ wiadomość: "Wystąpił błąd podczas tworzenia szkoły.", błąd: err.message }));
};

exports.schools_get_by_id = (req, res, next) => {
    const id = req.params.schoolId;
    School.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ wiadomość: "Nie znaleziono szkoły tańca o podanym ID." });
            }

            res.status(200).json({
                wiadomość: "Szczegóły szkoły tańca o numerze: " + id,
                dane: result
            });
        })
        .catch(err => res.status(500).json({ wiadomość: err }));
};

exports.schools_update = (req, res, next) => {
    const id = req.params.schoolId;

    const updatedData = {
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        contact: req.body.contact
    };

     School.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
            .then(updatedSchool => {
                if (!updatedSchool) {
                    return res.status(404).json({ wiadomość: "Nie znaleziono szkoły o podanym ID do aktualizacji." });
                }
    
                res.status(200).json({
                    wiadomość: "Zaktualizowano dane szkoły o numerze: " + id,
                    dane: updatedSchool,
                });
            })
            .catch(err => {
                console.error("Błąd podczas aktualizacji szkoły:", err);
                res.status(500).json({ wiadomość: "Wystąpił błąd podczas aktualizacji szkoły.", błąd: err.message });
            });
    };

exports.schools_patch = (req, res, next) => {
    const id = req.params.schoolId;

    const patchData = req.body;

    School.findByIdAndUpdate(id, patchData, { new: true, runValidators: true })
        .then(updatedSchool => {
            if (!updatedSchool) {
                return res.status(404).json({ wiadomość: "Nie znaleziono szkoły o podanym ID do aktualizacji." });
            }

            res.status(200).json({
                wiadomość: "Częściowo zaktualizowano dane szkoły o numerze: " + id,
                dane: updatedSchool,
            });
        })
        .catch(err => {
            console.error("Błąd podczas częściowej aktualizacji szkoły:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas częściowej aktualizacji szkoły.", błąd: err.message });
        });
};

exports.schools_delete = (req, res, next) => {
    const id = req.params.schoolId;

    School.findByIdAndDelete(id)
        .then(deletedSchool => {
            if (!deletedSchool) {
                return res.status(404).json({ wiadomość: "Nie znaleziono szkoły o podanym ID do usunięcia." });
            }

            res.status(200).json({ wiadomość: "Usunięto szkołę o numerze: " + id });
        })
        .catch(err => {
            console.error("Błąd podczas usuwania szkoły:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas usuwania szkoły.", błąd: err.message });
        });
};

exports.schools_head = (req, res, next) => {
    const id = req.params.schoolId;

    School.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ wiadomość: "Nie znaleziono szkoły o podanym ID." });
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