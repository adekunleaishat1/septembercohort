const slugify = require('slugify');

const generateSlug = (name) => {
    return slugify(name, 
        { replacement: '-', 
           lower: true, 
           strict: true ,
            trim: true 
        }
    );
}

module.exports = {generateSlug};    