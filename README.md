# Wiki Sentiment Analysis

A React application that visualizes emotional sentiments from Wikipedia articles using IBM Watson's Natural Language Understanding model. The application processes Wikipedia content through AWS Lambda functions to analyze emotional sentiment patterns and presents the data through interactive visualizations.

---

## Overview

This application allows users to:
- **Search for Wikipedia articles**
- **Visualize emotional sentiment analysis** including:
  - Joy
  - Sadness
  - Fear
  - Disgust
  - Anger
- **View sentiment scores** through an interactive radar chart
- **See detailed emotional breakdowns** in individual score cards

---

## Technology Stack

### **Frontend**
- React
- TypeScript
- Material-UI (MUI)
- Recharts (for data visualization)

### **Backend**
- AWS Lambda
- AWS Amplify
- IBM Watson Natural Language Understanding API
- Wikipedia API

---

## Architecture

The application follows this flow:
1. User searches for a Wikipedia article.
2. Frontend retrieves article content from the Wikipedia API.
3. Content is sent to an AWS Lambda function.
4. Lambda function processes content through IBM Watson's NLU.
5. Results are returned and visualized in the frontend.

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- AWS Amplify CLI
- AWS Account with appropriate permissions

---

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Amplify
```bash
amplify init
```

### 4. Set up Lambda Function
- Select the following options:
  - **Function template**: Hello World
  - **Runtime**: Node.js
  - **Advanced settings**: Yes
  - **Environment variables**:
    - `IBM_WATSON_API_KEY`
    - `IBM_WATSON_URL`

---

## Running the Development Server

Start the local development server:
```bash
npm start
```

The application will be available at [http://localhost:5173](http://localhost:5173).

---

## Deployment

### Deploy through AWS Amplify:
1. Push changes to Amplify:
   ```bash
   amplify push
   ```
2. Publish the application:
   ```bash
   amplify publish
   ```

---

### **Lambda Function**
The sentiment analysis is performed through an AWS Lambda function that:
1. **Receives Wikipedia article content**
2. **Processes it through IBM Watson's NLU**
3. **Returns emotional sentiment scores**


## Features

- **Wikipedia Integration**: Search and retrieve Wikipedia article content.
- **Serverless Processing**: AWS Lambda function handles NLU processing.
- **Data Visualization**:
  - Interactive radar charts
  - Color-coded score cards
- **Responsive Design**: Fully responsive interface.

---

## Development

### **Local Development**
1. Start the development server:
   ```bash
   npm start
   ```
2. Test Lambda functions locally.

---

## Testing

Add unit tests for frontend and backend components to ensure application reliability.

---

## Contributing

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **IBM Watson** for NLU capabilities.
- **Wikipedia API** for content access.
- **AWS** for cloud infrastructure.

---