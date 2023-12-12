let conversation = [];

// Saves the user's name and shows the chatbox
function saveUserName() {
    var userName = document.getElementById("userName").value;
    if (userName.trim() !== "") {
        // Saves the user's name
        localStorage.setItem("userName", userName);
        // Hides the name form
        document.getElementById("nameForm").style.display = "none";
        // Shows the chatbox
        document.getElementById("chatbox").style.display = "block";
    } else {
        alert("Please enter a valid name.");
    }
}

// Sends the query to the app.py File for the model 
// and logs the conversation for output
function sendQuery() {
    var userName = localStorage.getItem("userName");
    var userQuery = document.getElementById("query").value;
    // Adds user's query with timestamp to the conversation
    const userTimestamp = new Date().toLocaleString();
    conversation.push({ type: 'Query', content: userQuery, timestamp: userTimestamp, user: userName });

    fetch("http://127.0.0.1:5000?query=" + encodeURIComponent(userQuery), {
        method: "GET",
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        const aiTimestamp = new Date().toLocaleString();
        // Adds bot's response with timestamp to the conversation
        conversation.push({ type: 'Response', content: data || '', timestamp: aiTimestamp, user: 'Response' });
        // Updates the UI with the entire conversation history
        updateConversation();
    })
    .catch(error => {
        console.error(error);
        alert("Error:" + error);
    });
}

// Updates the conversation history in the UI
function updateConversation() {
    const responseDiv = document.getElementById("response");
    // Clears previous content
    responseDiv.innerHTML = "";
    // Displays the entire conversation
    conversation.forEach(message => {
        const messageElement = document.createElement("div");
        messageElement.classList.add(message.type);
        // Displays user query related content
        if (message.type === 'Query') {
            messageElement.textContent = `${message.user} (${message.timestamp}): ${message.content}`;
        } else {
            // Displays chatbots response related content
            messageElement.innerHTML = `Response (${message.timestamp}): ${message.content || ''}`;
        }
        // Adds a line break after query and response
        responseDiv.appendChild(messageElement);
        responseDiv.appendChild(document.createElement("br"));
    });
}

// Saves the conversation to a text file called UserChat_ECommerce.txt
function saveConversation() {
    // Creates a Blob with the conversation content
    const conversationText = conversation.map(message => `${message.user} (${message.timestamp}): ${message.type === 'Query' ? message.content : message.content}`).join('\n');
    const blob = new Blob([conversationText], { type: 'text/plain' });
    // Creates a link and triggers a click to prompt the user to download the file
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'UserChat_ECommerce.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Triggers the save conversation function on button click
function savePrompt() {
    const shouldSave = confirm("Do you want to save the conversation?");
    if (shouldSave) {
        saveConversation();
        // Clears the conversation after saving
        conversation.length = 0;
    }
}