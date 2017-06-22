var restify = require('restify');
var builder = require('botbuilder');
/*const APP_ID = '<LUIS_APP_ID>';
const APP_KEY = 'LUIS_APP_PWD';*/
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log("--------------------------------------------------------");
    console.log(" Bot is running with the address : " + server.url);
    console.log("--------------------------------------------------------");
});
// Create chat bot
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});
var bot = new builder.UniversalBot(connector);
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/143e315a-20ff-4312-8f0e-eb91c4aba098?subscription-key=15517d1daf234f10ba01b7c44e901806&timezoneOffset=0&verbose=true&q=';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({
    recognizers: [recognizer]
});
server.post('/api/messages', connector.listen());
bot.dialog('/', dialog);

dialog.matches('navigation', [
    function(session, args) {
        session.sendTyping();
        console.log("--------------------------------------------------------"+JSON.stringify(args));
        try {
        var fromPlaces = args.entities[0].entity;
        var toPlaces = args.entities[1].entity;
        } catch (error) {
            console.log("Error while detecting Entities!");
            session.send("Error while detecting Entities! Try with different entities.");
            exit(0);
        }
         console.log("navigation Intent Matched");
         session.send("Ok, navigating you "+fromPlaces+" "+toPlaces);

            if(fromPlaces=='from cse' && toPlaces == 'to canteen'){
            session.send("Go straight till you reach CSE circle and step down to ground floor, \n walk straight through the out door next to the principle room and then you will reach Canteen!");
        }

       else if((fromPlaces=='from cse' && toPlaces == 'to ece') || (toPlaces == 'to eee' && fromPlaces=='from mech')){
            session.send("Go straight till you reach the circle and follow to the nxt department");
        }

       else if(fromPlaces=='from cse' && toPlaces == 'to mech'){        
            session.send("Go straight till you reach CSE circle and step down to ground floor, \n take left and follow the CSE wing till you reach the mechanial wing and use steps to reach 1st floor and take right. Here is your Destination");
        }

        else if(fromPlaces=='from cse' && toPlaces == 'to eee'){
            session.send("Go straight till you reach CSE circle and step down to ground floor, \n take left and follow the CSE wing till you reach the mechanial wing and use steps to reach 1st floor and take left. Here is your Destination");
        }

        else if(fromPlaces=='from cse' && toPlaces == 'to civil'){
            session.send("Go straight till you reach CSE circle and step down to ground floor, \n take left and follow the CSE wing till you reach the mechanial wing and use steps to reach 2nd floor and take left. Here is your Destination");
        }

        else if(fromPlaces=='from cse' && toPlaces == 'to eee'){
            session.send("Go straight till you reach CSE circle and step down to ground floor, \n take left and follow the CSE wing till you reach the mechanial wing and use steps to reach 1st floor and take left. Here is your Destination");
        }

        else if(fromPlaces=='from cse' && toPlaces == 'to library'){
        session.send("Go straight till you reach CSE circle and use stairs to next floor and take right and here is Library very next to you!");   
    }
    
    else if(fromPlaces=='from cse' && toPlaces == 'to mba'){
        session.send("Go straight till you reach CSE circle and use stairs to next floor and take right and walk beside library and  here is MBA department.");   
    }
    
    else if(fromPlaces=='from cse' && toPlaces == 'to mca'){
        session.send("Go straight till you reach CSE circle and use stairs to next floor and take left and follow the MCA wing!");   
    }
    
     else if((fromPlaces=='from cse' && toPlaces == 'to ece') || (toPlaces == 'to eee' && fromPlaces=='from mech')){
        session.send("Go straight till you reach the circle and follow to the nxt department");
    }

    }
]);
dialog.matches('None',[
    function(session,args){
        console.log("Can't help you with this :(")
        session.send("Sorry! i can't help you with : \" "+session.message.text+"\"");
    }
]);
dialog.matches()