const Profile = require("./profile.js");




const home = (request, response)=>{
    if(request.url === "/") {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.write("Header\n");
        response.write("Search\n");
        response.end("Footer\n");
    }
};
const user = (request, response)=> {
    const username = request.url.replace("/", "");
    if (username.length > 0 ) {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.write("Header\n");

        //Get JSON here
        const studentProfile = new Profile(username);
        // On 'end'
        studentProfile.on("end", (profileJSON)=>{
            //show profile

            // Store the needed values
            const values = {
                avatarURL: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript,
            };
            // Simple response
            response.write(`${values.username} has ${values.badges} badges.\n`);
            response.end("Footer\n");
        });

        // on 'error'
        studentProfile.on("error", (error)=>{
            //show error
            response.write(error.message+"\n");
            response.end("Footer\n");
        });
    }
};

module.exports.home = home;
module.exports.user = user;