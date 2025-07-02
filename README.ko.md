# AI 쇼츠 비디오 생성기

<div align="center">

### 🌐 Language / 언어

[![English](https://img.shields.io/badge/Language-English-blue?style=for-the-badge)](README.md)
[![한국어](https://img.shields.io/badge/Language-한국어-red?style=for-the-badge)](README.ko.md)

</div>

---

🎬 **AI로 유튜브 쇼츠를 빠르게 만들어보세요!**

AI 기반 YouTube 쇼츠 비디오 생성 웹 애플리케이션입니다. 사용자가 원하는 주제를 입력하면 AI가 스크립트, 이미지, 음성, 자막을 자동으로 만들어줍니다.

## ✨ 주요 기능

### 🤖 AI 기반 콘텐츠 생성

- **스크립트 자동 생성**: Gemini를 활용하여 사용자가 설정한 주제에 맞는 스크립트 자동 생성
- **이미지 자동 생성**: AI가 스크립트에 맞는 적절한 이미지들을 생성
- **음성 합성**: OpenAI의 TTS를 활용하여 고품질 음성 합성
- **자막 생성**: 자동 자막 생성 및 SRT 파일 다운로드 지원

### 🎥 비디오 제작 기능

- **다양한 스타일**: Cartoon, Realistic, Cinematic, Cyberpunk 등 다양한 비디오 스타일 지원
- **다국어 지원**: 한국어 및 영어 스크립트 생성 지원

## 🛠 기술 스택

### Frontend

- **Next.js 15.2.1** - App Router 기반 React 프레임워크
- **React 18** - 현대적인 사용자 인터페이스
- **TypeScript** - 타입 안정성 보장
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Shadcn UI** - 현대적인 UI 컴포넌트 라이브러리

### AI & 미디어 처리

- **OpenAI API** - 고품질 음성 합성
- **Google Generative AI** - Gemini 모델 활용
- **Google Cloud Text-to-Speech** - 고품질 음성 합성
- **Deepgram SDK** - TTS에서 원하는 언어 자막 추출

### 상태 관리

- **Zustand** - 경량 상태 관리

## 📦 설치 방법

### 사전 요구사항

- Node.js 18.0 이상
- npm 또는 yarn
- OpenAI API 키
- Google Cloud API 키
- Deepgram API 키

### 1. 레포지토리 클론

```bash
git clone https://github.com/yourusername/ai-short-video-generator.git
cd ai-short-video-generator
```

### 2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

### 3. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 🏗 프로젝트 구조

이 프로젝트는 **Feature-Sliced Design**을 따르고 있습니다.

## 🔍 주요 기능 상세

### AI 스크립트 생성

- **Google Gemini**: 다양한 주제에 대한 스크립트 제공
- **다국어 지원**: 한국어와 영어 스크립트 동시 생성

### 이미지 생성

- **스타일별 생성**: 각 비디오 스타일에 맞는 이미지 생성
- **컨텍스트 인식**: 스크립트 내용에 맞는 적절한 이미지 생성
- **실시간 미리보기**: 생성된 이미지 즉시 확인 가능

### 음성 합성

- **OpenAI TTS**: 자연스러운 음성 합성
- **다양한 목소리**: 여러 음성 옵션 제공
- **언어별 최적화**: 한국어와 영어 각각 최적화된 음성

---

⭐ 이 프로젝트가 도움이 되셨다면 별표를 눌러주세요!
