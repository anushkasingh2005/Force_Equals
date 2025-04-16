# Force_Equals
# Force Equals Hiring Challenge Solutions

## Challenge 1: Target Account Matching API

### Overview
A RESTful API service that handles user authentication and company account management with match scores.

### Features
- JWT-based authentication
- Company data retrieval with match scores
- Company status updates
- Input validation
- Secure password handling

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install express body-parser jsonwebtoken bcryptjs
```
3. Start the server:
```bash
node server.js
```

### API Endpoints

#### Authentication
- `POST /login`
  - Request body: `{ "username": "user1", "password": "pass123" }`
  - Response: `{ "message": "Login successful", "token": "jwt_token" }`

#### Company Data
- `GET /accounts` (Requires authentication)
  - Response: Array of company objects with id, name, matchScore, and status

#### Status Updates
- `POST /accounts/:id/status` (Requires authentication)
  - Request body: `{ "status": "Target"|"Not Target" }`
  - Response: Updated company object

### Configuration
- Modify `JWT_SECRET` in server.js for production
- Adjust port number as needed

## Challenge 2: LinkedIn Profile Enhancer Widget

### Overview
A Chrome extension that displays company match information on LinkedIn profiles.

### Features
- Floating widget with company match data
- Toggle visibility via extension popup
- Persistent settings using chrome.storage
- Responsive design (300px width)
- Premium styling with animations
- Violet/black color scheme

### Installation
1. Clone the repository
2. In Chrome:
   - Navigate to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extension folder

### Files
- `manifest.json`: Extension configuration
- `content.js`: Main content script that injects the widget
- `popup.html/popup.js`: Extension popup UI and logic
- `styles.css`: All styling for widget and popup

### Usage
1. Navigate to any LinkedIn profile page
2. The widget will automatically appear in the bottom-right corner
3. Use the extension popup to toggle visibility

### Customization
- Edit the `premiumData` object in content.js to change displayed information
- Modify colors in styles.css
- Adjust animations in the CSS file

## Development Notes
For both challenges:
- All code is ES6+ compliant
- Error handling is implemented
- UI is responsive
- Follows modern security practices

For production use:
- Add proper error logging
- Implement database persistence
- Add input sanitization
- Consider rate limiting for the API
