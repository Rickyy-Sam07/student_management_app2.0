//started on 17/2
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotContainer = document.getElementById('chatbot-container');
const closeBtn = document.getElementById('close-btn');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');


chatbotIcon.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});


async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    appendMessage('user-message', message);
    userInput.value = '';

    // API integration with interface
    try {
        const response = await fetch('https://b4fc-2409-40e0-19-19ab-b412-d849-6825-59fe.ngrok-free.app/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        if (Array.isArray(data.response)) {
            appendMessage('bot-message', 'Saved Prompts:');
            data.response.forEach(prompt => {
                appendMessage('bot-message', `- ${prompt.prompt}`);
            });
        } else {
            appendMessage('bot-message', data.response || 'No response received');
        }
    } catch (error) {
        console.error('Error:', error);
        appendMessage('bot-message', 'Error communicating with the chatbot.');
    }
}

function appendMessage(className, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = text;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
//ended on 26/2