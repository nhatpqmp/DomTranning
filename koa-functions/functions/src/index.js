const functions = require("firebase-functions");

const apiHandlers = require("./handlers/api");


exports.helloWorld = functions.https.onRequest(apiHandlers.callback());
