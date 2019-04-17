const express = require('express');
const router = express.Router(); // similar to const app = express() but that doesn't work when we seperate routes from main index.js so we use this

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.post('/', (req, res) => {
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };

    // const result = Joi.validate(req.body, schema);
    // // Input validation
    // if (result.error) {
    //     // 400 Bad Request
    //     res.send(400).send(result.error.details[0].message);
    //     return;
    // }

    // simplified form of Input Validation
    const { error } = validateCourse(req.body); // object Destructing
    if (error) return res.send(400).send(result.error.details[0].message);

    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    // Look up the course
    // If not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not Found');
    
    // Validate
    // If Invalid,  return 400
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };

    // const result = Joi.validate(req.body, schema);
    // const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);
    if (error) return res.send(400).send(result.error.details[0].message);

    // Update Course
    // Return Updated Course
    course.name = req.body.name;
    res.send(course);
});


router.delete('/:id', (req, res) => {
    // Look up the course
    // Not Existig, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not Found');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return same course
    res.send(course);
});


router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not Found');
    res.send(course);
});


module.exports = router;