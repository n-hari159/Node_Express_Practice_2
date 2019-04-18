const mongoose = require('mongoose');

// Connecting to MongoDB
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB....'))
    .catch(err => console.error('Could not connect to MongoDB', err ));


// Schema for document in MongoDB
const courseSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Implementing Validation at Mongoose level. MongoDB doesn't care about any of these validations.
    category: {
        type: String,
        required: true,
        enum: ['web','mobile','network']
    },
    author: String,
    tags: {         // Custom-Validation. It states that every course should have atleast one tag. It shuldn't be empty,null or doesn't exist.
        type: Array,
        validate: {
            isAsync: true,      // Implementing Async Validator 1) => Need to set isAsync to true
            validator: function(v, callback) {      // 2) => Callback method to be implemented
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have atleast one tag.'        // optional message
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {            // This states that price is required when course is Published i.e., if (isPublished: true) then price is required.
        type: Number,
        required: function() { return this.isPublished; } // function returns booleana value.
    }
});

// we need to convert schema to model so that we can create instance of it to add data.
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course', // If we comment this line now, it will lead to an error which will be catch by the catch block and it will be "Course validation failed: name: Path `name` is required."
        category: 'web',    // This should be one among the enum in Schema, if not throws an error.
        author: 'Hari Nakka',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 15
    });
    
    try {
        const result = await course.save();
        console.log(result);
    }
    catch(ex) {
        for (field in ex.errors)    // Iterate through each and every field of the course object
            console.log(ex.errors[field].message); // Logs the Validation-Errors of each of them.
    }
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


async function updateCourse(id) {
    // // Approach : Query First => findById(),Modify its Properties, Save
    // const course = await Course.findById(id);
    // if(!course) return;
    // // Method1
    // course.isPublished = true;
    // course.author = 'Another Author';
    // // Method2
    // // course.set({
    // //     isPublished: true,
    // //     author: 'Another Author'
    // // });
    // const result = await course.save();
    // console.log(result);

    
    // Approach : Update First => Update Directly, Optionally: get the updated document
    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Hari',
            isPublished: false
        }
    });
    console.log(result);
}


async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

// removeCourse('5cb79c7d757928ff72e42e37');

// getCourses();

createCourse();
