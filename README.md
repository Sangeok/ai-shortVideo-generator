# AI Short Video Generator

🎬 **Create YouTube Shorts quickly with AI!**

An AI-powered YouTube Shorts video generation web application. Users simply input their desired topic, and AI automatically creates scripts, images, voice, and captions.

## ✨ Key Features

### 🤖 AI-Powered Content Generation

- **Automatic Script Generation**: Generate scripts automatically based on user-defined topics using Gemini
- **Automatic Image Generation**: AI generates appropriate images that match the script
- **Voice Synthesis**: High-quality voice synthesis using OpenAI's TTS
- **Caption Generation**: Automatic caption generation and SRT file download support

### 🎥 Video Production Features

- **Various Styles**: Support for diverse video styles including Cartoon, Realistic, Cinematic, Cyberpunk
- **Multi-language Support**: Script generation support for Korean and English

## 🛠 Tech Stack

### Frontend

- **Next.js 15.2.1** - React framework based on App Router
- **React 18** - Modern user interface
- **TypeScript** - Type safety assurance
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Modern UI component library

### AI & Media Processing

- **OpenAI API** - High-quality voice synthesis
- **Google Generative AI** - Gemini model utilization
- **Google Cloud Text-to-Speech** - High-quality voice synthesis
- **Deepgram SDK** - Extract captions in desired language from TTS

### State Management

- **Zustand** - Lightweight state management

## 📦 Installation

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- OpenAI API key
- Google Cloud API key
- Deepgram API key

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/ai-short-video-generator.git
cd ai-short-video-generator
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🏗 Project Structure

This project follows **Feature-Sliced Design**.

## 🔍 Feature Details

### AI Script Generation

- **Google Gemini**: Provides scripts for various topics
- **Multi-language Support**: Simultaneous generation of Korean and English scripts

### Image Generation

- **Style-specific Generation**: Generate images tailored to each video style
- **Context Awareness**: Generate appropriate images that match script content
- **Real-time Preview**: Instantly view generated images

### Voice Synthesis

- **Open AI TTS**: Natural voice synthesis
- **Various Voices**: Multiple voice options available
- **Language Optimization**: Optimized for Korean and English respectively

---

⭐ If this project was helpful, please give it a star!
