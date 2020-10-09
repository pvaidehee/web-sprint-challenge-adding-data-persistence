const express = require('express'); 

const db = require('./projects-model'); 

const router = express.Router(); 

// GET
router.get('/', (req, res) => {
    db.find()
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            res.status(500).json({ message: "Error finding projects" });
        });
});

// GET
router.get('/:id', (req, res) => {
    const { id } = req.params; 
    db.findById(id)
        .then(item => {
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ message: "Error finding project with this ID" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error finding projects" }); 
        });
}); 

// GET 
router.get('/:id/tasks', (req, res) => {
    const { id } = req.params; 
    db.findTasks(id)
        .then(items => {
            if (items.length) {
                res.status(200).json(items); 
            } else {
                res.status(404).json({ message: "No tasks for this project" }); 
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving tasks" }); 
        });
});

// POST
router.post('/', (req, res) => {
    const newProject = req.body; 
    db.add(newProject)
        .then(item => {
            res.status(201).json(item);
        })
        .catch(err => {
            res.status(500).json({ message: "Error adding project" }); 
        });
}); 

module.exports = router; 