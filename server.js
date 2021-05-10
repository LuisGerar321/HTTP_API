const http = require("http");
const PORT = 9000;
const localDB =  [2,3,4];
const  handler = require("./src/handlers");


function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }  //source of this function: https://www.codegrepper.com/code-examples/javascript/check+if+string+character+is+number+javascript

const myRouter = (path)=>{
        // console.log(path.split("?"));
        const routes = {
                "/":handler.welcome,
                "/myNumber": handler.GetPostDelete,
                "/reset": handler.Reset,

        }


        //If it is a number make the multiplication//
        if(  isNumber(path.split("/")[2]  )  ){
                console.log("it is a number");
                return routes[    `/myNumber`];
        }else{
                // console.log("No number");
        }


        if( routes[path.split("?")[0]]){
                return routes[   path.split("?")[0]    ];
                
        }

        return handler.NotFound;
}

const server = http.createServer( (request, response)  =>{
        const {url, method } = request; //Meta data
        const route = myRouter(request.url);
        return route(request, response);
});

server.listen( PORT, () =>{
        console.log(`Server running at port http://localhost:${PORT}`);
})