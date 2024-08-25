// src/app.ts
const websocketUrl: string =
  "wss://api-id.execute-api.region.amazonaws.com/dev";
const socket: WebSocket = new WebSocket(websocketUrl);

const chatBox: HTMLElement = document.getElementById("messages")!;
const messageInput: HTMLInputElement = document.getElementById(
  "message-input"
) as HTMLInputElement;
const sendButton: HTMLButtonElement = document.getElementById(
  "send-button"
) as HTMLButtonElement;

function displayMessage(message: string, sender: "user" | "webhook"): void {
  const messageElement: HTMLDivElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(
    sender === "user" ? "user-message" : "webhook-message"
  );
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}

sendButton.addEventListener("click", function () {
  const message: string = messageInput.value.trim();
  if (message !== "") {
    displayMessage(message, "user");
    socket.send(JSON.stringify({ message }));
    messageInput.value = "";
  }
});

socket.addEventListener("message", function (event: MessageEvent) {
  const data: { message: string } = JSON.parse(event.data);
  displayMessage(data.message, "webhook");
});

socket.addEventListener("error", function (event: Event) {
  console.error("WebSocket error:", event);
});

socket.addEventListener("close", function () {
  console.log("WebSocket connection closed");
});
