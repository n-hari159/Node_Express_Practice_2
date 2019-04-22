

// Trade off between Query Performance vs Consistency

// using Reference (Normalization) -> Consistency
let author = {
    name: 'Hari'
}

let course ={
    author: 'id'
}


// using Embedded Documents (Denormalization) -> Performance
let course ={
    author: {
        name: 'Hari'
    }
}



// Hybrid
let author ={
    name: 'Hari'
    // other properties
}

let course ={
    author: {
        id: 'ref',
        name: 'Hari'
    }
}