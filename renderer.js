const fs = require("fs");

// Merges values with the content
const mergeValues =(values, content)=>{
    //Cycle over the keys
    for (let key in values) {
        content = content.replace(`{{${key}}}`, values[key])
    }
        // Replace all {{keys}} with the values from the values object
    return content;
};

// Function that handles the reading of the files and merges them
const view =(templateName, values, response)=>{
    // Read from the template file
    let fileContents = fs.readFileSync('./views/'+templateName+".html", {encoding: "utf8"});
    //Insert the values into to the content
    fileContents = mergeValues(values, fileContents);
    // Write out the contents to the response
    response.write(fileContents);
};

module.exports.view = view;
