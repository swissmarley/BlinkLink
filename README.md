# 🔗 BlinkLink

A modern, full-stack URL shortener application with QR code generation and customization. BlinkLink allows users to create short, shareable links with generated QR codes that can be customized and set to expire after a specified duration.

## ✨ Features

- **URL Shortening**: Convert long URLs into compact, easy-to-share short links
- **QR Code Generation**: Automatically generate QR codes for each shortened URL
- **Customizable QR Codes**: Adjust QR code and background colors to match your branding
- **URL Expiration**: Set expiration dates for short links (7 days, 30 days, or unlimited)
- **Download QR Codes**: Save generated QR codes as PNG images
- **Real-time Processing**: Instant generation of short URLs and QR codes
- **Responsive Design**: Beautiful glassmorphism UI that works on all devices

## 🛠️ Tech Stack

### Frontend
- **Vue 3**: Progressive JavaScript framework for building the UI
- **Vite**: Next-generation frontend build tool for fast development
- **CSS3**: Glassmorphism design with modern styling

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **QRCode**: QR code generation library
- **UUID/NanoID**: Unique identifier generation
- **Cors**: Cross-origin resource sharing support

### Infrastructure
- **Docker Compose**: Containerized development and deployment

## 📋 Prerequisites

Before running BlinkLink, ensure you have:
- **Node.js** (v14 or higher)
- **npm** or **yarn** (package managers)
- **Docker** and **Docker Compose** (optional, for containerized setup)

## 🚀 Getting Started

### Option 1: Local Development

#### Backend Setup
```bash
cd backend
npm install
npm start
```
The backend server will run on `http://localhost:3000`

#### Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```
The frontend development server will run on `http://localhost:5173`

### Option 2: Docker Compose

Run both services with a single command:
```bash
docker-compose up
```

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

## 📖 Usage

1. **Enter a URL**: Paste the long URL you want to shorten in the input field
2. **Customize QR Code**: (Optional) Choose custom colors for the QR code and background
3. **Set Expiration**: Select how long the short link should remain active
4. **Generate**: Click "Generate" to create your short URL and QR code
5. **Download**: Save the QR code as a PNG image for use in print or digital media
6. **Share**: Copy and share your short URL

## 🏗️ Project Structure

```
BlinkLink/
├── backend/
│   ├── server.js          # Express server and API endpoints
│   ├── store.js           # In-memory data store for URL mappings
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.vue        # Main Vue component
│   │   ├── main.js        # Vue app entry point
│   │   └── style.css      # Global styles
│   ├── public/            # Static assets
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Frontend dependencies
├── docker-compose.yml     # Multi-container orchestration
└── README.md              # This file
```

## 🔌 API Endpoints

### Create Short URL
**POST** `/api/create`

Request body:
```json
{
  "originalUrl": "https://example.com/very/long/url",
  "color": "#000000",
  "bgColor": "#FFFFFF",
  "expiration": "7"
}
```

Response:
```json
{
  "shortUrl": "http://localhost:3000/a1b2c3d4",
  "qrCode": "data:image/png;base64,..."
}
```

### Redirect Short URL
**GET** `/:id`

Redirects to the original URL if it exists and hasn't expired.

## 📝 Environment Variables

### Backend
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

### Frontend
- `VITE_API_URL`: Backend API URL (used in Docker setup)

## 🧪 Development

### Building for Production

#### Frontend
```bash
cd frontend
npm run build
```

#### Backend
The backend is production-ready with no additional build steps required.

### Creating a Production Image
```bash
docker-compose -f docker-compose.yml up --build
```

## 📦 Dependencies

### Backend
- **express**: ^4.21.2
- **body-parser**: ^1.20.0
- **cors**: ^2.8.5
- **qrcode**: ^1.5.4
- **uuid**: ^8.3.2
- **nanoid**: ^5.1.5
- **fs-extra**: ^11.3.0

### Frontend
- **vue**: ^3.5.13
- **vite**: ^6.3.1
- **@vitejs/plugin-vue**: ^5.2.3

## 🔐 Security Considerations

- URLs are stored in memory and persist only during server runtime
- For production use, consider implementing:
  - Database persistence (MongoDB, PostgreSQL, etc.)
  - Input validation and sanitization
  - Rate limiting
  - HTTPS/SSL encryption
  - Authentication and authorization

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Ensure the backend is running on port 3000
- Check browser console for CORS errors
- Verify the `VITE_API_URL` environment variable in Docker setup

### QR Code not generating
- Ensure the QR Code library is installed: `npm install qrcode`
- Check that the original URL is valid

### Port already in use
- Change ports in `docker-compose.yml` or terminal command:
  ```bash
  PORT=3001 npm start  # For backend
  npm run dev -- --port 5174  # For frontend
  ```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.
