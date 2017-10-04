const Profile = require("./profile.js");
const renderer = require("./renderer");
const queryString = require('querystring');


const home = (request, response)=>{
    if(request.url === "/") {
        if (request.method.toLowerCase() === 'get') {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html');
            renderer.view("head", {}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        } else {
            // If url === "/" and method === POST

            // get the post data from body
            request.on('data', (postBody)=>{
                let query = queryString.parse(postBody.toString());
                response.writeHead(303, {"Location": "/" + query.username});
                response.end();
            });
            // extract the username

            // go to the /:username
        }
    }
};
const user = (request, response)=> {
    const username = request.url.replace("/", "");
    if (username.length > 0 ) {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        renderer.view("head", {}, response);

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
            renderer.view('profile', values, response);
            // response.write(`${values.username} has ${values.badges} badges.\n`);
            renderer.view('footer', {}, response);
            response.end();
        });

        // on 'error'
        studentProfile.on("error", (error)=>{
            //show error
            renderer.view("error", {errorMessage: error.message }, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        });
    }
};

module.exports.home = home;
module.exports.user = user;