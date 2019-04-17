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
        name: 'Angular Course',
        author: 'Hari Nakka',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    
    const result = await course.save();
    console.log(result);
}

// Querying Documents
async function getCourses() {
    const courses = await Course
        .find({ author: 'Hari Nakka', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
        // .count(); // Gives the no of documents with the filtered options.
        // .find({ price: { $gt: 10, $lte: 20 } }) // display courses that are gt(greater than) 10$. These are Comparision Query Operators
        // .find({ price: { $in: [10,15,20] } }) // display courses that are 10,15 and 20$
        // .find()
        // .or([ { author: 'Hari Nakka'}, { isPublished: true } ]) // or and and are Logical Query Operators. It displays courses with author Hari Nakka and courses that are pblished true.
        // Starts with Hari
        // .find({ author: /^Hari/ }) // Regular Expressions. It displays courses that has author name starting with Hari.
        // Ends with Nakka
        // .find({ author: /Nakka$/i }) // Courses that have author name ending with Nakka will be displayed and also case insensitive
        // Contains Hari
        // .find({ author: /.*Hari.*/i })
    console.log(courses);
}

getCourses();

// createCourse();
