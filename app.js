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
    messageContainer.style.transform = "translateY(30px) scale(0.95)";
  }

  const messageBubble = document.createElement("div");
  messageBubble.classList.add("message-bubble", sender === "user" ? "user-bubble" : "bot-bubble");
  
  // Add bot avatar for bot messages
  if (sender === "bot") {
    const botInfo = document.createElement("div");
    botInfo.classList.add("flex", "items-center", "gap-2", "mb-2");
    botInfo.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/>
        </svg>
      </div>
      <span class="text-xs font-medium text-gray-600">AI Assistant</span>
      <span class="text-xs text-gray-400">• ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
    `;
    messageBubble.appendChild(botInfo);
  }
  
  // Handle multiline content and basic formatting
  const formattedContent = content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-blue-600 underline">$1</a>');
  
  const contentDiv = document.createElement("div");
  contentDiv.innerHTML = formattedContent;
  messageBubble.appendChild(contentDiv);
  messageContainer.appendChild(messageBubble);
  chatBox.appendChild(messageContainer);

  // Animate message appearance with stagger effect
  if (animate) {
    requestAnimationFrame(() => {
      messageContainer.style.transition = "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
      messageContainer.style.opacity = "1";
      messageContainer.style.transform = "translateY(0) scale(1)";
      
      // Add a subtle bounce effect
      setTimeout(() => {
        messageBubble.style.transform = "scale(1.02)";
        setTimeout(() => {
          messageBubble.style.transform = "scale(1)";
        }, 150);
      }, 200);
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

// Create typing loader with enhanced animation
function createLoader() {
  const loaderContainer = document.createElement("div");
  loaderContainer.classList.add("loader-container");
  loaderContainer.id = "typing-loader";
  loaderContainer.style.opacity = "0";
  loaderContainer.style.transform = "translateY(20px)";

  const loaderBubble = document.createElement("div");
  loaderBubble.classList.add("loader-bubble");

  // Add bot avatar for consistency
  const botInfo = document.createElement("div");
  botInfo.classList.add("flex", "items-center", "gap-2", "mb-2");
  botInfo.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/>
      </svg>
    </div>
    <span class="text-xs font-medium text-gray-600">AI Assistant</span>
    <span class="text-xs text-cyan-600">typing...</span>
  `;
  loaderBubble.appendChild(botInfo);

  // Create enhanced loader with both spinner and dots
  const loaderContent = document.createElement("div");
  loaderContent.classList.add("flex", "items-center", "gap-3");
  
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

  const typingText = document.createElement("span");
  typingText.textContent = "AI is thinking...";
  typingText.classList.add("text-sm", "text-gray-600", "animate-pulse");

  loaderContent.appendChild(loaderSpinner);
  loaderContent.appendChild(typingDots);
  loaderContent.appendChild(typingText);
  loaderBubble.appendChild(loaderContent);
  loaderContainer.appendChild(loaderBubble);
  chatBox.appendChild(loaderContainer);
  
  // Animate loader appearance
  requestAnimationFrame(() => {
    loaderContainer.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    loaderContainer.style.opacity = "1";
    loaderContainer.style.transform = "translateY(0)";
  });

  // Smooth scroll to show loader
  setTimeout(() => {
    chatBox.scrollTo({
      top: chatBox.scrollHeight,
      behavior: 'smooth'
    });
  }, 50);
}

// Remove typing loader with smooth animation
function removeLoader() {
  const loader = document.getElementById("typing-loader");
  if (loader) {
    loader.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    loader.style.opacity = "0";
    loader.style.transform = "translateY(-15px) scale(0.95)";
    setTimeout(() => {
      if (loader.parentNode) {
        loader.remove();
      }
    }, 400);
  }
}

// Disable/enable input and send button with smooth transitions
function toggleInput(disabled) {
  userInput.disabled = disabled;
  sendBtn.disabled = disabled;
  
  if (disabled) {
    sendBtn.style.opacity = "0.6";
    sendBtn.style.transform = "scale(0.95)";
    userInput.style.opacity = "0.7";
    userInput.style.transform = "scale(0.98)";
    userInput.placeholder = "AI is responding...";
  } else {
    sendBtn.style.opacity = "1";
    sendBtn.style.transform = "scale(1)";
    userInput.style.opacity = "1";
    userInput.style.transform = "scale(1)";
    userInput.placeholder = "Type your question here...";
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
  
  // Add user message with success feedback
  createMessage(prompt, "user");
  userInput.value = "";
  showSuccessFeedback();
  
  // Show typing indicator
  createLoader();

  try {
    // Update connection status
    updateConnectionStatus('connecting');
    
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
    
    // Handle response with enhanced formatting
    if (data && data.response) {
      const botResponse = data.response.trim();
      if (botResponse) {
        // Add slight delay for more natural conversation flow
        setTimeout(() => {
          createMessage(botResponse, "bot");
        }, 300);
      } else {
        setTimeout(() => {
          createMessage("I received your message but couldn't generate a response. Please try rephrasing your question.", "bot");
        }, 300);
      }
    } else {
      setTimeout(() => {
        createMessage("❌ I'm sorry, I couldn't process your request at the moment. Please try again.", "bot");
      }, 300);
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
    // Re-enable input and update status
    toggleInput(false);
    updateConnectionStatus('online');
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

// Enhanced input handling with visual feedback
userInput.addEventListener("input", (e) => {
  const value = e.target.value;
  
  // Auto-resize input based on content
  userInput.style.height = "auto";
  userInput.style.height = Math.min(userInput.scrollHeight, 120) + "px";
  
  // Dynamic send button state
  if (value.trim()) {
    sendBtn.style.opacity = "1";
    sendBtn.style.transform = "scale(1)";
  } else {
    sendBtn.style.opacity = "0.7";
    sendBtn.style.transform = "scale(0.95)";
  }
  
  // Character count feedback
  const charCount = value.length;
  if (charCount > 400) {
    userInput.style.borderColor = "rgba(239, 68, 68, 0.5)";
  } else if (charCount > 300) {
    userInput.style.borderColor = "rgba(245, 158, 11, 0.5)";
  } else {
    userInput.style.borderColor = "";
  }
});

// Add visual feedback for successful message send
function showSuccessFeedback() {
  const originalText = sendBtn.innerHTML;
  sendBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  sendBtn.style.background = "linear-gradient(135deg, #10b981, #059669)";
  
  setTimeout(() => {
    sendBtn.innerHTML = originalText;
    sendBtn.style.background = "";
  }, 1000);
}

// Add header animation on scroll
function handleHeaderAnimation() {
  const header = document.querySelector('.chat-header');
  chatBox.addEventListener('scroll', () => {
    if (chatBox.scrollTop > 50) {
      header.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)';
      header.style.boxShadow = 'none';
    }
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  userInput.focus();
  handleHeaderAnimation();
  
  // Add enhanced entrance animation to existing welcome message
  const welcomeMessage = chatBox.querySelector('.bot-message');
  if (welcomeMessage) {
    welcomeMessage.style.opacity = "0";
    welcomeMessage.style.transform = "translateY(30px) scale(0.95)";
    
    setTimeout(() => {
      welcomeMessage.style.transition = "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
      welcomeMessage.style.opacity = "1";
      welcomeMessage.style.transform = "translateY(0) scale(1)";
    }, 500);
  }
  
  // Add floating effect to logo
  const logo = document.querySelector('.logo-container');
  if (logo) {
    setInterval(() => {
      logo.style.transform = 'translateY(-2px)';
      setTimeout(() => {
        logo.style.transform = 'translateY(0)';
      }, 1000);
    }, 3000);
  }
});

// Enhanced visual feedback for button interactions
sendBtn.addEventListener("mousedown", () => {
  sendBtn.style.transform = "translateY(1px) scale(0.98)";
});

sendBtn.addEventListener("mouseup", () => {
  sendBtn.style.transform = "translateY(-2px) scale(1.05)";
});

sendBtn.addEventListener("mouseleave", () => {
  sendBtn.style.transform = "translateY(-1px) scale(1)";
});

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + Enter for quick send
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
  
  // Escape to clear input
  if (e.key === "Escape") {
    userInput.value = "";
    userInput.focus();
  }
});

// Add connection status indicator
function updateConnectionStatus(status) {
  const statusIndicator = document.querySelector('.chat-header .ml-auto');
  const statusDot = statusIndicator.querySelector('div div');
  const statusText = statusIndicator.querySelector('span');
  
  if (status === 'online') {
    statusDot.className = 'w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg';
    statusText.textContent = 'Online';
  } else if (status === 'connecting') {
    statusDot.className = 'w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg animate-pulse';
    statusText.textContent = 'Connecting';
  } else {
    statusDot.className = 'w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full shadow-lg';
    statusText.textContent = 'Offline';
  }
}

// Update connection status during API calls
window.addEventListener('online', () => updateConnectionStatus('online'));
window.addEventListener('offline', () => updateConnectionStatus('offline'));
