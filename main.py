# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from decouple import config
# import openai
# import logger
# # Load environment variables
# openai.api_key = config("OPENAI_API_KEY")

# if not openai.api_key:
#     raise ValueError("OPENAI_API_KEY is not set. Please check your .env file.")
# # Initialize FastAPI app
# app = FastAPI()

# # Add CORS Middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000/"],  # Replace "*" with your React app URL for security (e.g., "http://localhost:3000")
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Define request model
# class ChatRequest(BaseModel):
#     user_input: str
# @app.post("/api/chat/")
# async def chat(request: ChatRequest):
#     try:
#         logger.debug("Received user input: %s", request.user_input)

#         # Call the OpenAI API with messages
#         response = openai.ChatCompletion.create(
#             model="gpt-3.5-turbo",
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant."},
#                 {"role": "user", "content": request.user_input}
#             ],
#             max_tokens=150,
#             temperature=0.7
#         )
        
#         # Extract bot's response
#         bot_response = response["choices"][0]["message"]["content"].strip()
#         logger.debug("OpenAI API response: %s", bot_response)
        
#         return {"response": bot_response}

#     except openai.error.OpenAIError as e:
#         logger.error("OpenAI API Error: %s", str(e))
#         raise HTTPException(status_code=500, detail=f"OpenAI API Error: {str(e)}")

#     except Exception as e:
#         logger.error("Unexpected Error: %s", str(e))
#         raise HTTPException(status_code=500, detail=f"Unexpected Error: {str(e)}")

# # @app.post("/api/chat/")
# # async def chat(request: ChatRequest):
    # try:
    #     response = openai.ChatCompletion.create(
    #         model="gpt-3.5-turbo",
    #         #prompt=request.user_input,
    #          messages=[
    #              {"role": "system", "content": "You are a helpful assistant."},
    #              {"role": "user", "content": request.user_input}
    #        ],
    #         max_tokens=150
    #     )
    #     return {"response": response.choices[0].text.strip()}
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=str(e))
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from decouple import config
import openai

# Load environment variables
openai.api_key = config("OPENAI_API_KEY")

if not openai.api_key:
    raise ValueError("OPENAI_API_KEY is not set. Please check your .env file.")

# Initialize FastAPI app
app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your React app URL for security (e.g., "http://localhost:3000")
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class ChatRequest(BaseModel):
    user_input: str

@app.post("/api/chat/")
async def chat(request: ChatRequest):
    try:
        # Using ChatCompletion API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # You can also use "gpt-3.5-turbo"
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": request.user_input}
            ],
            max_tokens=150
        )
        # Extracting the bot's response
        bot_response = response.choices[0].message.content.strip()
        return {"response": bot_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
