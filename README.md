# neo-backend

## Overview

`neo-backend` is an Express.js server that provides an API endpoint to interact with Google's Gemini generative AI model. It accepts user input and returns generated text responses using the Gemini API.

## Features

- RESTful API endpoint (`/api/generate`) for text generation
- Uses Google Generative AI (Gemini)
- Input validation and error handling
- CORS support
- Environment variable configuration

## Setup

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Create a `.env` file** in the project root with your Gemini API key:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key
   PORT=3000 # optional, defaults to 3000
   ```
4. **Start the server**:
   ```bash
   node express.js
   # or for development
   npx nodemon express.js
   ```

## Usage

Send a POST request to `/api/generate` with a JSON body:

```json
{
  "input": "Your prompt here"
}
```

Example using `curl`:

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"input": "Hello, Gemini!"}'
```

Response:

```json
{
  "response": "...generated text..."
}
```

## API

### POST `/api/generate`

**Request Body:**

- `input` (string, required): The prompt to send to Gemini.

**Response:**

- `response` (string): The generated text from Gemini.

**Errors:**

- 400: Invalid content type, missing or invalid input
- 500: Internal server error

## Dependencies

- express
- @google/generative-ai
- dotenv
- cors
- nodemon (dev)

## License

ISC
