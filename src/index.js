/**
 * App ID for the skill
 */
var APP_ID = 'amzn1.ask.skill.362fb105-0f72-4a11-9c58-9a3ab74c6088'; //replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

var https = require('https');

/**
 * The AlexaSkill Module that has the AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill'),
    pickMeUps = require('./PickMeUpLibrary');


/**
 * ThisSucksSkill is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var ThisSucksSkill = function() {
    AlexaSkill.call(this, APP_ID);
};

 

// Extend AlexaSkill
ThisSucksSkill.prototype = Object.create(AlexaSkill.prototype);
ThisSucksSkill.prototype.constructor = ThisSucksSkill;

ThisSucksSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("ThisSucksSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // any session init logic would go here
};

ThisSucksSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("ThisSucksSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    getWelcomeResponse(response);
};

ThisSucksSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // any session cleanup logic would go here
};

ThisSucksSkill.prototype.intentHandlers = {

    
    "GetPickMeUpLowIntent": function(intent, session, response) {
        handlePickMeUpLowIntentRequest(intent, session, response);
    },
    "GetPickMeUpMedIntent": function(intent, session, response){
        handlePickMeUpMedIntentRequest(intent, session, response);   
    },
    "GetPickMeUpHighIntent": function(intent, session, response){
        handlePickMeUpHighIntentRequest(intent, session, response);   
    },
    "GetRelationshipAffirmation": function(intent, session, response){
        console.log("relationship intent");
        handlePickMeUpRelationshipIntentRequest(intent, session, response);   
    },
    "GetAffirmationIntent": function(intent, session, response){
        handlePickMeUpAffirmationIntentRequest(intent, session, response);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "With This Sucks, you can tell me if you're feeling down and I will do my best to cheer you up. " +
            "For example, you could say i need a pick me up, my boyfriend broke up with me, or i failed my test.";
        var repromptText = "Are you doing okay?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = {
                speech: "Goodbye",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = {
                speech: "Goodbye",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tell(speechOutput);
    }
};

/**
 * Function to handle the onLaunch skill behavior
 */

 var welcomeMessages = ["What's wrong buddy?", "What's going on?", "How are you feeling?", "what's got you down?"];

function getWelcomeResponse(response) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var cardTitle = "This Sucks, Alexa is here for you";
    var random = Math.floor(Math.random() * welcomeMessages.length); 
    var repromptText = "Are you okay? You can tell me if you're sad, mad, or need a pick me up"; 
    var speechText = welcomeMessages[random];
    var cardOutput = "Having a bad day? Alexa is here to cheer you up.";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.

    var speechOutput = {
        speech: "<speak>" + speechText + "</speak>",
        type: AlexaSkill.speechOutputType.SSML
    };
    var repromptOutput = {
        speech: repromptText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.askWithCard(speechOutput, repromptOutput, cardTitle, cardOutput);
}

/**
 * Gets a poster prepares the speech to reply to the user.
 */


function handlePickMeUpLowIntentRequest(intent, session, response) {
    var random = Math.floor(Math.random() * pickMeUps["low"].length); 
    var speechOutput = pickMeUps["low"][1]; 
    response.tell(speechOutput);
}

function handlePickMeUpMedIntentRequest(intent, session, response) {
    var random = Math.floor(Math.random() * pickMeUps["med"].length); 
    var speechOutput = pickMeUps["med"][random]; 
    response.tell(speechOutput);
}

function handlePickMeUpHighIntentRequest(intent, session, response) {
    var random = Math.floor(Math.random() * pickMeUps["high"].length); 
    var speechOutput = pickMeUps["high"][random]; 
    response.tell(speechOutput);
}

function handlePickMeUpAffirmationIntentRequest(intent, session, response) {
    var vowels = new Set();
    vowels.add("a"); 
    vowels.add("e"); 
    vowels.add("i"); 
    vowels.add("o");
    vowels.add("u"); 

    var nouns = new Set(); 
    nouns.add("idiot");
    nouns.add("moron");
    
    // var affirmations = [
    //         "You're too harsh on yourself. Speak positively about yourself. Always remember you are valuable and unique.", 
    //         "Be patient with yourself. Growth takes time. You can't expect results overnight."
    //         ];
    var affirmations = [];
    if( nouns.has(intent.slots.affirm.value)){
        if (vowels.has(intent.slots.affirm.value[0])){
            affirmations.push("You are not an " + intent.slots.affirm.value + ". Remember all the things you've done right.");
            affirmations.push("You are not an" + intent.slots.affirm.value + ". Nobody is perfect. We are all trying our best");
        }
        else{
            affirmations.push("You are not a " + intent.slots.affirm.value + ". Remember all the things you've done right.");
            affirmations.push("You are not a" + intent.slots.affirm.value + ". Nobody is perfect. We are all trying our best");
        }
        
    }else{
        affirmations.push("You are not " + intent.slots.affirm.value + ". Remember all the things you've done right.");
        affirmations.push("You are not " + intent.slots.affirm.value + ". Nobody is perfect. We are all trying our best");
    }
    
    var random = Math.floor(Math.random() * affirmations.length); 
    var speechOutput = affirmations[random];
    response.tell(speechOutput);
}

function handlePickMeUpRelationshipIntentRequest(intent, session, response) {
    var random = Math.floor(Math.random() * pickMeUps["relationship"].length); 
    var speechOutput = pickMeUps["relationship"][random]; 
    response.tell(speechOutput);
}



// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HistoryBuff Skill.
    var skill = new ThisSucksSkill();
    skill.execute(event, context);
};

