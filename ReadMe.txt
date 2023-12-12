# About
- An automatic chatbot that is built for the sole purpose of Automating common user chat queries without any employer
interaction.

# How To
- Users type their name in the initial Username Textbox and click on Submit, this will carry their name over to the
actual Chatbot. (See Two Screenshots)
- In the next Screen Users can ask questions to chatbot and they will get reply back, replies are based on Corpus File.
- After they are done with their queries, users have the option to save their conversation as a text file After clicking
on the Save Conversation button.

# Technical
- Using OpenAi's API while using "gpt-3.5-turbo-1106" model.
    For Local:
        OpenAi Api key is needed for the model to work, the key can changed inside .env
        .env file is hidden from git using .gitignore file
    For Cloud:    
        For Cloud like GCloud i was using Google's Secret Manager, to properly secure the API Key.
- Chroma DB for vectors from Langchain is being used for similarity search.
- Sentence Embedding is done using "all-MiniLM-L6-v2" model from HuggingFace.
- Chatbot is trained on a Training Corpus file located in TrainingCorpus folder. New Corpus can be added to The
existing file or added as a new txt file to the exisiting folder.

# Future Improvements
- Connect it with database for conversation storage.
- Automatic account pull, so there is no need for manual username.
- UI improvements are needed.
- Instead of telling the location of certain queries e.g. go to order page and click on order status , chatbot should 
give a link to order status page for specified order.

