const {request} =  require("http");
const fs  = require("fs");
const os =  require("os");
const localDB = require("../public/db.js")


const welcome = ( request, response)=>{
        response.writeHead(200, { "Content-Type":  "text/html" } );

        const html  = fs.readFileSync(  "./src/public/index.html",  "utf-8");
        response.write(html);
        response.end();
};
const NotFound = (request, response)=>{
        response.writeHead(404,  { "Content-Type": "text/html"} );
        const html = fs.readFileSync(  "./src/public/404.html", "utf-8");
        response.write(html);
        response.end();
}

const GetPostDelete = (request, response)=>{
        var item = null;
        switch(request.method){
                case "POST":
                        var data = "";
                        request.on("data", (chunck)=>{
                                data +=  chunck;
                                // console.log(  item    );
                                //Adding a new element  into file/
                        }); 

                        request.on("end", ()=>{
                                const newData =  {...JSON.parse( data)};
                                console.log(  typeof newData.myNumber    );
                                if(typeof newData.myNumber === "number" ){
                                        localDB.myNumber =  newData.myNumber;
                                        response.writeHead(200, { "Content-type":  "text/html" } );
                                        response.write("Saved");
                                        response.end( item)
                                }else{ //Bad request
                                        response.writeHead(400,  { "Content-Type": "text/html"} );
                                        response.write("Bad request: input is not number");
                                        response.end();   
                                }
                                
                        }); 


                        break;
                case "GET":
                        const url = request.url;
                        console.log(url);

                        //If you receive a request from path /myNumber/{multiplier}, you should return in the response the value: myNumber*multiplier
                        if(!localDB.myNumber ){
                                response.writeHead(400, { "Content-Type":  "text/json" } );
                                response.write("There is not a number store in local db yet. Store a number into myNumber atributte and try again, pls...!") ;
                                response.end();
                                break;
                        }else{
                                if(  url.split("/").length>2       ){

                                        response.writeHead(200, { "Content-Type":  "text/json" } );
                                        response.write(JSON.stringify(localDB.myNumber * url.split("/")[2] ) );
                                        response.end();
                                        break;
        
                                }

                                response.writeHead(200, { "Content-Type":  "text/json" } );
                                response.write(JSON.stringify(localDB.myNumber) );
                                response.end();
                                break;
                        }




                case "DELETE":
                        response.writeHead(200, { "Content-Type":  "text/txt" } );
                        fs.writeFileSync("./src/public/db.txt","" ,"utf-8" )
                        response.write("Done");
                        response.end();
                        break;
        }
};
const Reset =  (request, response)=>{
        localDB.myNumber = null;
        response.writeHead(200,  { "Content-Type": "text/html"} );
        const html = fs.readFileSync(  "./src/public/reset.html", "utf-8");
        response.write(html);
        response.end();
}
const BadRequest = ()=>{
        response.writeHead(200,  { "Content-Type": "text/html"} );
        const html = fs.readFileSync(  "./src/public/reset.html", "utf-8");
        response.write(html);
        response.end();   
}


module.exports = {
        welcome,
        GetPostDelete,
        NotFound,
        Reset,
}