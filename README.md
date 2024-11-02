# Trade Republic Coding Challenge

## Overview

This project is a frontend application for managing stock subscriptions using **React** and **Vite**. The goal is to create a simple stock watchlist, where users can subscribe/unsubscribe to stocks using ISIN numbers and view real-time price updates via WebSocket.

## Technologies Used

- **React**: The core framework for building the frontend application.
- **Vite**: Fast build tool and development server.
- **TypeScript**: Application logic and WebSocket handling.
- **CSS**: Custom styles for UI components without external UI libraries.
- **HTML5 (Semantic)**: Structured HTML elements for accessibility and usability.
- **WebSocket**: Real-time communication with a backend server for stock price updates.

## Testing

- **Unit Testing**: Implemented with React Testing Library and Vitest.
- **Manual Testing**: Tested on both mobile and desktop screen sizes to ensure responsiveness and user experience.

## Setup Instructions

### Prerequisites

Ensure [Node.js](https://nodejs.org) (version 16 or higher) is installed.

### Running the Project

1. **Install Dependencies**: Clone the repository and install dependencies.

   ```bash
   npm install
   # or
   yarn
   ```

2. **Run the Project**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Run Unit Tests**:

   ```bash
   npm run test
   # or
   yarn test
   ```

## Tasks Completed

### Task 1: ISIN Subscription Form

Implemented a form to allow users to submit an ISIN and add it to a watchlist with:

- Validation (12-character alphanumeric ISIN)
- Prevention of duplicate subscriptions (case insensitive)
- Preventing the user from submitting an empty value
- Preventing the user from adding new subscriptions while the WebSocket is disconnected
- Inline error message for invalid ISIN

### Task 2: Display and Manage Watchlist

Users can view a list of subscribed stocks and receive live price updates.

- Unsubscription capability is included, allowing users to focus on selected stocks.
- The app alerts the user if the WebSocket disconnects to indicate that data is not up-to-date.
- Responsive design adjustments for mobile and desktop viewports.

### Task 3: Additional Features

- Persist the saved ISINs of the subscribed stocks when the user reloads the page. Subscriptions are saved in the browser's local storage.

- Enhanced user experience with:
  - Accessibility improvements (semantic HTML and ARIA attributes).
  - UI feedback transitions and CSS animations for visual cues.
  - Error handling with alerts for connectivity issues.

## Questions

### 1. WebSocket Disconnection Handling

**What happens in case the WebSocket disconnects? How would you go further to keep the live data available or inform the user? Please discuss the challenges.**

- If the WebSocket disconnects, the application notifies the user with a warning that the data is out-of-date. Also prevent the user from adding new subscriptions by disabling the UI.
- To address this further, we can implement a polling mechanism that periodically attempts to reconnect, restoring the connection and resuming data updates. One challenge with this approach is managing repeated reconnection attempts without impacting performance. I’d also consider implementing an exponential backoff strategy to handle frequent disconnections gracefully.

### 2. Handling Duplicate Subscriptions

**What happens if a user adds an instrument multiple times to their list? Please discuss possible challenges and mitigations.**

- To prevent duplicate subscriptions, I implemented a check to see if the ISIN already exists in the watchlist before adding a new subscription, if it's already in the list, it will not be added again and UI will show an inline error message.
- Suppose the user adds the same ISIN multiple times from some external source, the implementation of Map with ISIN as key for the watchlist will prevent displaying the same ISIN multiple times.

### 3. Performance Challenges with Multiple Subscriptions

**What potential performance issues might you face when this app scales with multiple subscriptions?How would you improve the speed and user experience?**

With multiple subscriptions, potential issues include:

- Increased memory usage from managing a large WebSocket subscription list.
- Rendering and updating UI components for each subscription.

To improve performance, I’d consider:

- Using a virtualized list for efficient rendering of a large number of stocks. This approach will render only the visible items in the viewport, improving the performance and reducing the memory usage.
