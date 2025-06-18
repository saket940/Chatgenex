# Customizable Chatbot Creator

A full-stack application for creating, customizing, and deploying AI-powered chatbots with a modern user interface and robust backend infrastructure.

## Project Structure

This project is organized into three main components:

### 1. Frontend (ec/)
- Modern React-based user interface
- Built with Vite for optimal development experience
- Features a drag-and-drop interface for chatbot customization
- Real-time preview of chatbot changes
- Responsive design for all devices

### 2. Backend (ecb/)
- Node.js/Express server
- RESTful API architecture
- MongoDB database integration
- Handles chatbot logic, user management, and data persistence
- Secure authentication and authorization

### 3. Chatbot Interface (ecc/)
- Separate frontend component for the actual chatbot interface
- Customizable themes and styling
- Real-time chat functionality
- Responsive design for embedding in any website

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd project
```

2. Install dependencies for each component:

Frontend (ec/):
```bash
cd ec
npm install
```

Backend (ecb/):
```bash
cd ecb
npm install
```

Chatbot Interface (ecc/):
```bash
cd ecc
npm install
```

## Development

1. Start the backend server:
```bash
cd ecb
npm run dev
```

2. Start the frontend development server:
```bash
cd ec
npm run dev
```

3. Start the chatbot interface:
```bash
cd ecc
npm run dev
```

## Features

### Core Features

#### 🎨 Chatbot Customization
- **Visual Customization**
  - Customize chatbot avatar, colors, and themes
  - Adjust chat window size and position
  - Modify message bubbles and typography
  - Add custom CSS for advanced styling
- **Behavior Customization**
  - Set custom welcome messages
  - Configure response delays
  - Define conversation flows
  - Create custom triggers and actions

#### 🤖 AI Model Integration
- **Multiple AI Models Support**
  - OpenAI GPT integration
  - Custom model training capabilities
  - Model switching without code changes
  - Response customization per model
- **Training & Fine-tuning**
  - Upload custom training data
  - Fine-tune responses
  - Create custom knowledge bases
  - Set context and personality

#### 🔒 Security & Authentication
- **User Management**
  - Secure user registration and login
  - Role-based access control
  - API key management
  - Session handling
- **Data Protection**
  - End-to-end encryption
  - Secure data storage
  - GDPR compliance
  - Regular security audits

#### 📱 User Interface
- **Responsive Design**
  - Mobile-first approach
  - Cross-browser compatibility
  - Adaptive layouts
  - Touch-friendly controls
- **Dashboard Features**
  - Real-time analytics
  - User interaction tracking
  - Performance metrics
  - Usage statistics

### Advanced Features

#### 🎯 Builder Interface
- **Drag-and-Drop Editor**
  - Visual flow builder
  - Component library
  - Real-time preview
  - Template system
- **Code Integration**
  - JavaScript/TypeScript support
  - Custom function hooks
  - API integration tools
  - Webhook support

#### 🔄 Real-time Features
- **Live Updates**
  - Instant message delivery
  - Real-time status updates
  - Live user presence
  - Typing indicators
- **Synchronization**
  - Multi-device sync
  - State management
  - Conflict resolution
  - Offline support

#### 📊 Analytics & Monitoring
- **Performance Tracking**
  - Response time metrics
  - User engagement stats
  - Error tracking
  - Usage patterns
- **Reporting Tools**
  - Custom report generation
  - Export capabilities
  - Data visualization
  - Trend analysis

#### 🌐 Deployment & Integration
- **Easy Deployment**
  - One-click deployment
  - Cloud platform support
  - Containerization
  - CI/CD integration
- **Integration Options**
  - Website embedding
  - API access
  - Webhook support
  - Third-party integrations

### How It Works

1. **Setup & Configuration**
   - Install the application using the provided setup instructions
   - Configure environment variables
   - Set up your database
   - Choose your AI model provider

2. **Chatbot Creation**
   - Use the visual builder to design your chatbot
   - Configure appearance and behavior
   - Set up conversation flows
   - Train or integrate your AI model

3. **Integration & Deployment**
   - Generate embed code for your website
   - Configure API endpoints
   - Set up webhooks if needed
   - Deploy to your preferred platform

4. **Monitoring & Management**
   - Access the dashboard for analytics
   - Monitor chatbot performance
   - Make real-time adjustments
   - Update and maintain your chatbot

## Environment Variables

Create `.env` files in both frontend and backend directories with the following variables:

Backend (.env in ecb/):
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

Frontend (.env in ec/ and ecc/):
```
VITE_API_URL=http://localhost:5000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team. 