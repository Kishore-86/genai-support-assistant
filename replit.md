# Overview

GenAI Customer Support is a modern web-based chat interface designed to provide AI-powered customer support through an intuitive conversational interface. The application features a sleek glass morphism design with real-time messaging capabilities, built to integrate with AWS API Gateway endpoints for AI chat functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application follows a simple client-side architecture built with vanilla JavaScript, HTML, and CSS. The frontend is designed as a single-page application (SPA) with the following key components:

- **Message Management System**: Dynamic DOM manipulation for creating and displaying chat messages with support for formatting (bold, italic) and multiline content
- **Glass Morphism UI**: Modern design pattern using backdrop blur effects and transparent overlays for visual appeal
- **Responsive Design**: Mobile-first approach using Tailwind CSS for consistent styling across devices
- **Animation System**: CSS transitions and transforms for smooth message appearances and user interactions

## Client-Side Components
- **Chat Interface**: Real-time message display with user and bot message differentiation
- **Input Handling**: Text input with enter key support and send button functionality
- **Message Formatting**: Basic markdown-style formatting support for enhanced message display
- **Smooth Scrolling**: Automatic scroll-to-bottom behavior for new messages

## API Integration Architecture
The application is designed to integrate with AWS API Gateway endpoints:
- **RESTful Communication**: HTTP POST requests to serverless backend
- **Environment Configuration**: Configurable API endpoint through environment variables
- **Error Handling**: Basic error handling for failed API requests

## Static Asset Management
- **Image Assets**: Logo and background images served from local assets directory
- **Font Integration**: Google Fonts (Inter) for typography consistency
- **CSS Framework**: Tailwind CSS via CDN for rapid styling

# External Dependencies

## Third-Party Services
- **AWS API Gateway**: Backend API endpoint for AI chat functionality (configurable)
- **Tailwind CSS**: Utility-first CSS framework delivered via CDN
- **Google Fonts**: Inter font family for typography

## Development Dependencies
- **http-server**: Local development server for serving static files
- **Node.js**: Runtime environment for package management

## Browser APIs
- **Fetch API**: For making HTTP requests to the backend
- **DOM Manipulation**: For dynamic content updates
- **CSS Backdrop Filter**: For glass morphism visual effects

## Asset Dependencies
- **Background Images**: Custom background image (bg86.jpg)
- **Logo Assets**: Company/product logo (logo.png)
- **Loader Graphics**: Loading animation assets (referenced but not included)

The application is designed to be easily deployable as a static website with minimal configuration required for the API endpoint integration.