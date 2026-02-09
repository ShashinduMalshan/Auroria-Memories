# 🌿 Auroria – Personal Memory & Diary App

Auroria is a beautifully designed **personal diary and memory application** built with **Expo (React Native)** and **Firebase**.
It allows users to preserve life moments using **text, images, and voice recordings**, presented in a calm, scrapbook-style experience.

Auroria focuses on **privacy, emotion, and simplicity**, making it feel like a **digital memory book**, not just another notes app.

---

## ✨ Core Features

### 📝 Text Memories

* Write daily thoughts, reflections, or long-form diary entries
* Handwritten-style fonts for a natural diary feel
* Pinch-to-zoom text resizing in diary view

### 📸 Image Memories

* Upload images from gallery or camera
* Scrapbook-style image layout with shadows and rotations
* Images stored securely in Firebase Storage

### 🎙️ Voice Memories

* Record personal voice notes
* Play, pause, resume, and seek audio
* Duration display and progress bar
* Ideal for vlog-style memories without video

### 📖 Diary Book Experience

* Horizontal swipe like turning book pages
* Smooth animations and gestures
* Each memory feels like a page in a diary

### 👤 Authentication & Security

* Firebase Authentication (Email/Password)
* User-specific data isolation (each user sees only their memories)
* Automatic app lock after inactivity
* Optional biometric unlock (fingerprint / face)

---

## 🧠 Why Auroria Is Different

* ❌ No social feed
* ❌ No likes, comments, or pressure
* ✅ Fully private
* ✅ Emotion-first design
* ✅ Voice-based memory storytelling

Auroria is built for **personal reflection**, not public sharing.

---

## 🛠️ Tech Stack

### Frontend

* **Expo + React Native**
* **TypeScript**
* **Expo Router**
* **NativeWind (Tailwind for RN)**

### Backend (Firebase)

* **Firestore** – store memories
* **Firebase Auth** – user authentication
* **Firebase Storage** – images & audio files

### Audio & Gestures

* `expo-av` – audio recording & playback
* `react-native-gesture-handler`
* `react-native-reanimated`

### Build & Deployment

* **Expo EAS Build**
* Android Preview & Production builds

---

## 📂 Project Structure

```
app/
 ├─ (auth)/           # Login & Register screens
 ├─ (dashboard)/      # Home, profile, settings
 ├─ diary/            # Diary book view
 ├─ save/             # Create new memory
context/
 ├─ AuthContext.tsx   # Auth & user state
 ├─ LockContext.tsx   # Auto-lock logic
service/
 ├─ memoryService.ts  # Firestore memory logic
 ├─ storageService.ts # Firebase Storage
 ├─ audioService.ts   # Audio helpers
```

---

## 📸 Screenshots

> 📌 *Replace the image paths below with real screenshots once you take them.*

### 🔐 Authentication

![Login Screen](screenshots/login.png)
![Register Screen](screenshots/register.png)

### 🏠 Dashboard

![Dashboard](screenshots/dashboard.png)

### ✍️ Create Memory

![Create Memory](screenshots/create-memory.png)
![Voice Recording](screenshots/voice-record.png)

### 📖 Diary Book View

![Diary Book](screenshots/diary-book.png)
![Voice Playback](screenshots/voice-playback.png)

### ⚙️ Settings

![Settings](screenshots/settings.png)

---

## 🔐 Environment Variables

Auroria uses **EAS environment variables** (build-time):

```
EXPO_PUBLIC_FIREBASE_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
```

Configured using:

```bash
eas env:create
```

---

## 📱 Permissions Used

| Permission   | Purpose               |
| ------------ | --------------------- |
| Camera       | Capture images        |
| Media Access | Select photos         |
| Microphone   | Record voice memories |

Permissions are requested **only when needed**.

---

## 🚀 Running the Project

### Install dependencies

```bash
npm install
```

### Start development

```bash
npx expo start
```

### Build Android (EAS)

```bash
eas build -p android --profile preview
```

---

## 👤 Author

**Shasidu Malshan**
📧 Email: [shasidumalshan9579@gmail.com](mailto:shasidumalshan9579@gmail.com)
🔗 GitHub: [https://github.com/ShashinduMalshan](https://github.com/ShashinduMalshan)

---

## 🌱 Future Enhancements

* Cloud backup restore
* Mood-based memory tagging
* Voice transcription (AI)
* Timeline & calendar view
* iOS build support

---
