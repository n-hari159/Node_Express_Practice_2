const mongoose = require('mongoose');

// Connecting to MongoDB
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB....'))
    .catch(err => console.error('Could not connect to MongoDB', err ));


// Schema for document in MongoDB
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// we need to convert schema to model so that we can create instance of it to add data.
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'Hari Nakka',
        tags: ['node', 'backend'],
        isPublished: true
    });
    
    
    const result = await course.save();
    console.log(result);
}

createCourse();
