# 🍅 Pomofocus - Pomodoro Timer

A beautiful, modern Pomodoro timer web application designed to help you stay focused and productive. Built with vanilla HTML, CSS, and JavaScript with user authentication and session tracking.

## ✨ Features

- **Three Focus Modes:**
  - 🎯 **Focus** - 25 minutes of deep work
  - 🧘 **Short Break** - 5 minutes to recharge
  - 🎉 **Long Break** - 15 minutes of full relaxation

- **User Authentication:**
  - Sign up with email and password
  - Secure login with "Remember Me" feature (30-day sessions)
  - Personal user profiles

- **Visual Progress Tracking:**
  - Animated SVG progress ring
  - Real-time countdown timer
  - Mode-specific color themes (orange for focus, green for breaks)

- **Session Statistics:**
  - Track completed focus sessions
  - Monitor total minutes focused
  - Count breaks taken

- **Smart Task Management:**
  - Add what you're working on
  - Clear task quickly
  - Focus-specific task display

- **Productivity Tips:**
  - Random motivational tips between sessions
  - Best practices for Pomodoro technique

- **Modern Dark UI:**
  - Beautiful dark theme with accent colors
  - Smooth animations and transitions
  - Fully responsive design
  - Space Grotesk font for modern aesthetics

## 🚀 Getting Started

### Live Demo
👉 **Visit:** [Your GitHub Pages URL](https://github.com/YOUR_USERNAME/pomodoro-timer)

### Test Account
```
Email: demo@pomofocus.com
Password: demo123
```

### Or Create Your Own Account
1. Click **"Create one here"** on the login page
2. Fill in your details
3. Start your first focus session!

## 📁 File Structure

```
pomodoro-timer/
├── index.html       # Main timer application
├── login.html       # User login page
├── signup.html      # User registration page
├── script.js        # Timer logic and functionality
├── auth.js          # Authentication system
├── style.css        # All styling (responsive design)
└── README.md        # This file
```

## 🔧 How It Works

### Authentication System
- User data stored in browser's localStorage
- "Remember Me" creates 30-day sessions
- Passwords encoded (for demo purposes)
- Automatic login page redirect if not authenticated

### Timer Functionality
- Countdown timer with real-time updates
- Skip session button
- Reset to start fresh
- Automatic stats tracking
- Visual progress ring with smooth animations

### Features Breakdown

**Login Page (`login.html`)**
- Email/username input
- Password field
- Remember Me checkbox
- Link to sign-up page

**Sign-up Page (`signup.html`)**
- Full name field
- Email validation
- Password confirmation
- Terms agreement checkbox
- Form validation with error messages

**Timer Page (`index.html`)**
- Mode switching (Focus/Short Break/Long Break)
- Visual countdown
- Task input box
- Control buttons (Start, Reset, Skip)
- Stats display
- User profile with logout

## 💾 Data Storage

All data is stored locally in your browser:
- User accounts & passwords
- Session information
- Login preferences
- Statistics (if implemented)

**Note:** Data persists across sessions but is device-specific.

## 🎨 Design Features

- **Color Scheme:**
  - Background: Dark navy (#0f0e17)
  - Surface: Slightly lighter (#1a1927)
  - Accent: Orange (#ff6b35) for focus
  - Secondary: Green (#3dd68c) for breaks
  - Text: Clean white (#fffffe)

- **Typography:** Space Grotesk font for modern look
- **Responsive:** Works on desktop, tablet, and mobile
- **Accessibility:** Semantic HTML, clear labels, focus states

## 🔐 Security Note

This is a frontend-only demo. For production:
- Never store passwords in browser storage
- Use proper backend authentication
- Implement secure session management
- Add HTTPS encryption
- Use proper password hashing

## 📝 Usage Guide

### Starting a Session
1. Log in with your credentials
2. Choose your mode (Focus/Break)
3. Enter what you're working on (optional)
4. Click **Start**
5. Stay focused until timer ends!

### Tips for Success
- Work in focused 25-minute blocks
- After 4 focus sessions, take a longer break
- Keep phone face-down during sessions
- One task at a time - no multitasking
- Drink water between sessions

## 🛠️ Customization

You can easily customize:
- **Timer durations** - Edit `MODES` in `script.js`
- **Colors** - Edit CSS variables in `style.css`
- **Tips** - Add your own in `TIPS` array in `script.js`
- **Labels** - Customize mode labels in `script.js`

## 📦 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

This app is deployed on **GitHub Pages**. To deploy your own:

1. Create a GitHub repository
2. Upload all files
3. Go to **Settings → Pages**
4. Select **Deploy from branch** → **main**
5. Your site will be live at: `https://YOUR_USERNAME.github.io/pomodoro-timer/`

## 📚 Learning Resources

- [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [SVG Animation](https://developer.mozilla.org/en-US/docs/Web/SVG)

## 🤝 Contributing

Found a bug or have a feature idea? Feel free to:
- Fork the repository
- Make improvements
- Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ for productivity enthusiasts

## 📞 Feedback

Have suggestions? Issues? Drop them in the GitHub issues section!

---

**Happy Focusing! 🍅** 

Remember: One pomodoro at a time, one tomato at a time.
