"use strict";
// src/app.ts
const websocketUrl = "wss://api-id.execute-api.region.amazonaws.com/dev";
const socket = new WebSocket(websocketUrl);
const chatBox = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
function displayMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(sender === "user" ? "user-message" : "webhook-message");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}
sendButton.addEventListener("click", function () {
    const message = messageInput.value.trim();
    if (message !== "") {
        displayMessage(message, "user");
        socket.send(JSON.stringify({ message }));
        messageInput.value = "";
    }
});
socket.addEventListener("message", function (event) {
    const data = JSON.parse(event.data);
    displayMessage(data.message, "webhook");
});
socket.addEventListener("error", function (event) {
    console.error("WebSocket error:", event);
});
socket.addEventListener("close", function () {
    console.log("WebSocket connection closed");
});
