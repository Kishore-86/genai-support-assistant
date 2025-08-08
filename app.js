// DOM elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// API configuration - Replace with your actual endpoint
const API_URL = window.API_URL || "https://your-api-id.execute-api.region.amazonaws.com/prod/chat";

// Message creation function
function createMessage(content, sender, animate = true) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add(sender === "user" ? "user-message" : "bot-message");
  
  if (animate) {
    messageContainer.style.opacity = "0";
    messageContainer.style.transform = "translateY(20px)";
  }

  const messageBubble = document.createElement("div");
  messageBubble.classList.add("message-bubble", sender === "user" ? "user-bubble" : "bot-bubble");
  
  // Handle multiline content and basic formatting
  const formattedContent = content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  messageBubble.innerHTML = formattedContent;
  messageContainer.appendChild(messageBubble);
  chatBox.appendChild(messageContainer);

  // Animate message appearance
  if (animate) {
    requestAnimationFrame(() => {
      messageContainer.style.transition = "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
      messageContainer.style.opacity = "1";
      messageContainer.style.transform = "translateY(0)";
    });
  }

  // Smooth scroll to bottom
  setTimeout(() => {
    chatBox.scrollTo({
      top: chatBox.scrollHeight,
      behavior: 'smooth'
    });
  }, 50);
}

// Create typing loader
function createLoader() {
  const loaderContainer = document.createElement("div");
  loaderContainer.classList.add("loader-container");
  loaderContainer.id = "typing-loader";

  const loaderBubble = document.createElement("div");
  loaderBubble.classList.add("loader-bubble");

  // Create SVG loader or use the provided loader.svg
  const loaderSpinner = document.createElement("img");
  loaderSpinner.src = "assets/loader.svg";
  loaderSpinner.alt = "Loading";
  loaderSpinner.classList.add("loader-spinner");

  // Typing dots animation
  const typingDots = document.createElement("div");
  typingDots.classList.add("typing-dots");
  
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("div");
    dot.classList.add("typing-dot");
    typingDots.appendChild(dot);
  }

  loaderBubble.appendChild(loaderSpinner);
  loaderBubble.appendChild(typingDots);
  loaderContainer.appendChild(loaderBubble);
  chatBox.appendChild(loaderContainer);

  // Smooth scroll to show loader
  setTimeout(() => {
    chatBox.scrollTo({
      top: chatBox.scrollHeight,
      behavior: 'smooth'
    });
  }, 50);
}

// Remove typing loader
function removeLoader() {
  const loader = document.getElementById("typing-loader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.transform = "translateY(-10px)";
    setTimeout(() => {
      loader.remove();
    }, 300);
  }
}

// Disable/enable input and send button
function toggleInput(disabled) {
  userInput.disabled = disabled;
  sendBtn.disabled = disabled;
  
  if (disabled) {
    sendBtn.style.opacity = "0.6";
    userInput.style.opacity = "0.7";
  } else {
    sendBtn.style.opacity = "1";
    userInput.style.opacity = "1";
  }
}

// Main send message function
async function sendMessage() {
  const prompt = userInput.value.trim();
  
  // Validation
  if (!prompt) {
    userInput.focus();
    return;
  }

  if (prompt.length > 500) {
    createMessage("⚠️ Please keep your message under 500 characters.", "bot");
    return;
  }

  // Disable input while processing
  toggleInput(true);
  
  // Add user message
  createMessage(prompt, "user");
  userInput.value = "";
  
  // Show typing indicator
  createLoader();

  try {
    // API call
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ prompt: prompt })
    });

    // Remove loader
    removeLoader();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle response
    if (data && data.response) {
      const botResponse = data.response.trim();
      if (botResponse) {
        createMessage(botResponse, "bot");
      } else {
        createMessage("I received your message but couldn't generate a response. Please try rephrasing your question.", "bot");
      }
    } else {
      createMessage("❌ I'm sorry, I couldn't process your request at the moment. Please try again.", "bot");
    }

  } catch (error) {
    removeLoader();
    console.error("API Error:", error);
    
    // User-friendly error messages
    let errorMessage = "⚠️ I'm experiencing technical difficulties. ";
    
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      errorMessage += "Please check your internet connection and try again.";
    } else if (error.message.includes("404")) {
      errorMessage += "The service is temporarily unavailable.";
    } else if (error.message.includes("500")) {
      errorMessage += "There's a server issue. Please try again in a moment.";
    } else {
      errorMessage += "Please try again or contact support if the issue persists.";
    }
    
    createMessage(errorMessage, "bot");
  } finally {
    // Re-enable input
    toggleInput(false);
    userInput.focus();
  }
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Auto-focus input on load
userInput.addEventListener("input", () => {
  // Auto-resize input based on content
  userInput.style.height = "auto";
  userInput.style.height = Math.min(userInput.scrollHeight, 120) + "px";
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  userInput.focus();
  
  // Add subtle entrance animation to existing welcome message
  const welcomeMessage = chatBox.querySelector('.bot-message');
  if (welcomeMessage) {
    welcomeMessage.style.opacity = "0";
    welcomeMessage.style.transform = "translateY(20px)";
    
    setTimeout(() => {
      welcomeMessage.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      welcomeMessage.style.opacity = "1";
      welcomeMessage.style.transform = "translateY(0)";
    }, 500);
  }
});

// Add visual feedback for button interactions
sendBtn.addEventListener("mousedown", () => {
  sendBtn.style.transform = "translateY(1px)";
});

sendBtn.addEventListener("mouseup", () => {
  sendBtn.style.transform = "translateY(-1px)";
});

sendBtn.addEventListener("mouseleave", () => {
  sendBtn.style.transform = "translateY(-1px)";
});
