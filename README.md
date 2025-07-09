📱 WhatsApp Clone – React Native (Android 15 Compatible)
A functional WhatsApp clone built using React Native, designed to simulate voice/video call notifications using Firebase Cloud Messaging (FCM). This app supports real-time push notifications, even when the app is in the background or killed, and includes native Android module integration (Java/Kotlin) for full notification control on Android 13–15.

🔑 Features
📞 Incoming call notifications like WhatsApp

🔔 Works in background and terminated states

🔗 Deep linking (taps on notifications open specific screens)

🛠️ Native Android module for high-priority calls

🔥 Integrated with Firebase Cloud Messaging

✅ Compatible with Android 13–15

🧩 Tech Stack
Frontend: React Native

Native Modules: Java/Kotlin (Android)

Notification Service: Firebase Cloud Messaging

Backend Simulation: Node.js with Firebase Admin SDK

🚀 Getting Started
Clone this repo

Run npm install

Add your google-services.json file in /android/app

Launch on Android with:

bash
Copy
Edit
npx react-native run-android
Trigger push notifications from a simulated backend using Firebase Admin SDK

🔧 Bonus Features (Optional)
Call-like full-screen UI via native channel

Badge counts and missed call tracking

Deep linking to open call/chat screens

📝 Notes
Focus is on call notification experience, not full messaging.

Designed with a clean and minimal UI for faster testing.

Ideal for learning FCM integration and native module development in React Native.

🤝 Contributions
Suggestions, issues, and pull requests are welcome!

