const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Set your deployed API Gateway endpoint here
const API_URL = "https://your-api-id.execute-api.region.amazonaws.com/prod/chat";

function createMessage(content, sender) {
  const message = document.createElement("div");
  message.classList.add(sender, "p-3", "my-2", "rounded-xl", "max-w-[75%]", "text-sm", "shadow", "leading-relaxed");

  // Tailwind alignment
  if (sender === "user") {
    message.classList.add("bg-green-100", "self-end", "text-right", "ml-auto");
  } else if (sender === "bot") {
    message.classList.add("bg-white/80", "text-gray-800", "self-start", "mr-auto");
  }

  message.textContent = content;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function createLoader() {
  const loader = document.createElement("img");
  loader.src = "./loader.svg";
  loader.alt = "loading";
  loader.classList.add("loader", "w-6", "h-6", "animate-spin", "self-center", "my-2");
  loader.id = "loader";
  chatBox.appendChild(loader);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.remove();
}

async function sendMessage() {
  const prompt = userInput.value.trim();
  if (!prompt) return;

  createMessage(prompt, "user");
  userInput.value = "";
  createLoader();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    removeLoader();

    if (response.ok && data && data.response) {
      createMessage(data.response.trim(), "bot");
    } else {
      createMessage("❌ Error: Unable to fetch response", "bot");
    }
  } catch (error) {
    removeLoader();
    console.error("API Error:", error);
    createMessage("⚠️ Server Error", "bot");
  }
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
