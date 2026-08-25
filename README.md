
# 🧠 CampusMind AI

### AI-Powered College Survival Companion

CampusMind AI is a modern AI-powered student platform designed to bring academic support, study planning, student guidance, productivity, and wellness tools together in one place.

Instead of switching between multiple applications for studying, planning, guidance, and student support, CampusMind AI provides a centralized experience built specifically around the everyday needs of college students.

🌐 **Live Application:** https://campusmind-ai.web.app/

---

## ✨ What is CampusMind AI?

College life involves much more than academics.

Students need to manage:

- 📚 Studies and academic preparation
- 🗓️ Study schedules and tasks
- 🧠 Stress and burnout
- 🤖 AI-based assistance
- 🎓 Mentorship and academic guidance
- 📈 Personal progress
- 💼 Career and student development

CampusMind AI brings these experiences together into a single, responsive web application.

The goal is simple:

> **Make college life more organized, informed, and manageable with the help of AI.**

---

## 🚀 Features

### 🤖 AI Coach

An integrated AI-powered coaching experience that provides students with conversational assistance and personalized guidance.

- AI-powered student assistance
- Conversational chatbot interface
- Personalized guidance
- Accessible across the application
- Designed around student needs

---

### 📚 Study Planner

A dedicated study-planning experience to help students organize their academic workload.

- Plan study activities
- Organize academic tasks
- Track study progress
- Manage upcoming work
- Structured student dashboard

---

### 🎓 Guidance Hub

A centralized hub for academic and student guidance.

The Guidance Hub provides access to:

- 👨‍🏫 Mentors
- 📝 Notes
- 📄 Previous Year Questions (PYQs)
- ⭐ Important Topics
- 💪 Practice resources
- 🎥 YouTube lectures
- 🤖 AI-generated notes

It also includes mentor discovery and search functionality to help students find relevant guidance.

---

### 🧠 Stress & Burnout Tracking

A student wellness section focused on helping users understand and manage academic stress.

- Stress tracking
- Burnout awareness
- Wellness-focused insights
- Student-friendly interface
- Visual progress and tracking experience

---

### 📊 Student Dashboard

A centralized dashboard that brings important student information and application features together.

- Personalized student experience
- Quick access to major modules
- Progress-oriented interface
- Organized navigation
- Responsive dashboard design

---

### 🔐 Authentication

CampusMind AI includes authentication and protected application areas.

- User registration
- User login
- Protected routes
- Personalized user experience
- Firebase integration

---

### 💎 Pro / Pricing Experience

CampusMind AI includes a dedicated pricing and upgrade experience for premium functionality.

- Pricing page
- Pro upgrade interface
- Feature comparison
- Student-focused upgrade flow

---

### 🧭 Modern Navigation

The application uses a structured navigation system with dedicated routes for public and authenticated experiences.

Public pages include:

- Landing Page
- Login
- Signup
- Pricing
- Legal / Privacy

Protected application areas include:

- Dashboard
- Study Planner
- Stress & Burnout Tracking
- AI Coach
- Guidance Hub

---

### 📱 Responsive UI

CampusMind AI is designed for a modern responsive experience across different screen sizes.

The interface focuses on:

- Clean layouts
- Responsive components
- Modern cards and dashboards
- Smooth animations
- Accessible navigation
- Student-friendly visual design

---

## 🛠️ Tech Stack

### Frontend

- **React 18**
- **Vite 5**
- **JavaScript / JSX**
- **React Router 6**
- **Tailwind CSS**

### State Management

- **Redux**
- **Redux Toolkit**

### UI & Animation

- **Framer Motion**
- **Lucide React**
- **Radix UI**
- **Tailwind CSS utilities**

### Data Visualization

- **D3.js**
- **Recharts**

### Forms & API

- **React Hook Form**
- **Axios**
- **EmailJS**

### Backend / Cloud Services

- **Firebase**

### Supporting Tools

- Vite
- PostCSS
- Autoprefixer
- Tailwind CSS plugins

---

## 🏗️ Project Architecture

CampusMind AI follows a modular React architecture where application pages, reusable components, utilities, hooks, contexts, and Firebase configuration are separated into dedicated areas.

```text
campusmind-ai/
│
├── .firebase/
│
├── dist/
│
├── public/
│   ├── assets/
│   │   └── images/
│   ├── _redirects
│   ├── favicon.ico
│   ├── firebase-messaging-sw.js
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── AppIcon.jsx
│   │   ├── AppImage.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── GeminiChatbot.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ScrollToTop.jsx
│   │
│   ├── contexts/
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │
│   ├── pages/
│   │   ├── ai-coach/
│   │   ├── dashboard-overview/
│   │   ├── guidance-hub/
│   │   ├── landing-page/
│   │   ├── legal/
│   │   ├── login/
│   │   ├── pricing/
│   │   ├── signup/
│   │   ├── stress-and-burnout-tracking/
│   │   ├── study-planner/
│   │   └── NotFound.jsx
│   │
│   ├── styles/
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── Routes.jsx
│   ├── firebase.js
│   └── index.jsx
│
├── .firebaserc
├── .gitignore
├── firebase.json
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.mjs
├── LICENSE
└── README.md
````

The structure above matches the repository currently visible on GitHub, including the actual `src` directories and root configuration files. ([GitHub][1])

---

## 🧭 Application Routes

CampusMind AI uses React Router for application navigation.

### Public Routes

```text
/
 /landing-page
 /login
 /signup
 /pricing
 /legal
```

### Protected Routes

```text
/dashboard-overview
/study-planner
/stress-and-burnout-tracking
/ai-coach
/guidance-hub
```

### Fallback

```text
/*
```

The protected sections are wrapped with the application's `ProtectedRoute` component, while routing also includes an error boundary and scroll-to-top handling. ([GitHub][3])

---

## 📂 Core Application Modules

| Module                        | Purpose                                             |
| ----------------------------- | --------------------------------------------------- |
| **AI Coach**                  | AI-powered student assistance and coaching          |
| **Study Planner**             | Organizing study activities and academic tasks      |
| **Guidance Hub**              | Mentors, notes, PYQs, topics, practice and lectures |
| **Stress & Burnout Tracking** | Student wellness and stress awareness               |
| **Dashboard**                 | Centralized student overview                        |
| **Authentication**            | Login, signup and protected access                  |
| **Pricing**                   | Pro/premium upgrade experience                      |
| **Landing Page**              | Product introduction and onboarding                 |
| **Legal**                     | Terms and privacy information                       |

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have:

* **Node.js**
* **npm**

installed on your system.

---

### 1. Clone the Repository

```bash
git clone https://github.com/mannbadaya23/campusmind-ai.git
```

### 2. Open the Project

```bash
cd campusmind-ai
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The Vite development server will start the application locally.

You can also use:

```bash
npm start
```

because the project currently defines `start` as the Vite development command. ([GitHub][2])

---

## 📦 Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run serve
```

The project's current scripts use Vite for development, production builds, and previewing the production output. ([GitHub][2])

---

## 🔥 Firebase

CampusMind AI uses Firebase services within the application.

The repository contains Firebase configuration files including:

```text
.firebaserc
firebase.json
src/firebase.js
public/firebase-messaging-sw.js
```

Firebase is used as part of the application's cloud and authentication-related infrastructure.

---

## 🎨 UI & Design

CampusMind AI uses a modern student-focused interface built around:

* Minimal and clean layouts
* Purple/indigo visual identity
* Rounded cards and controls
* Responsive dashboards
* Smooth animations
* Clear information hierarchy
* Interactive navigation
* AI-focused visual elements

The interface is designed to feel more like a modern student product than a traditional college management portal.

---

## 🧩 Reusable Components

The application contains reusable components for common functionality, including:

* `GeminiChatbot`
* `ProtectedRoute`
* `ErrorBoundary`
* `ScrollToTop`
* `AppIcon`
* `AppImage`
* UI components

This keeps common application behavior separated from individual pages and improves maintainability. ([GitHub][4])

---

## 🛡️ Error Handling & Route Protection

CampusMind AI includes:

* Route protection for authenticated sections
* Error boundary handling
* Not Found page
* Scroll position management during navigation

The main `App.jsx` integrates the routing system and the global Gemini chatbot component. ([GitHub][5])

---

## 🌐 Live Demo

### 🚀 CampusMind AI

**Live Website:**

[https://campusmind-ai.web.app/](https://campusmind-ai.web.app/)

Explore the application and experience the different student-focused modules.

---

## 🎯 Project Vision

CampusMind AI is built around a simple vision:

> **One platform for a smarter college journey.**

The long-term goal is to create an intelligent digital companion that helps students throughout their college life—from planning studies and managing academic pressure to finding guidance and using AI-powered assistance.

CampusMind AI aims to make student support:

* More accessible
* More personalized
* More organized
* More intelligent
* More student-centric

---

## 🚀 Future Scope

Potential future improvements include:

* More advanced AI-powered academic assistance
* Personalized learning recommendations
* Enhanced study analytics
* AI-generated study plans
* More mentorship capabilities
* Expanded student productivity tools
* Deeper academic progress insights
* Additional integrations for student workflows

---

## 👨‍💻 Developer

### Mann Badaya

Computer Science & Engineering Student

GitHub:
[https://github.com/mannbadaya23](https://github.com/mannbadaya23)

---

## 📄 License

This project is licensed under the **Apache License 2.0**.

See the `LICENSE` file for the complete license text.

---

## ⭐ Support

If you find CampusMind AI interesting, consider giving the repository a ⭐ on GitHub.

---

### 🧠 CampusMind AI

**Study smarter. Stay organized. Get guidance. Take control of your college journey. 🚀**

