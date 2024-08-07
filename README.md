# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# financial-health-app

A web app to assess and improve users' financial health. It provides a quiz to gather data on financial situations, analyzes responses using OpenAI's API, and generates scores and personalized recommendations across categories like Emergency Fund, Expense Management, Personal Debt, Insurance, and Retirement Target.

## Features

- User Registration and Profile Management
- Financial Health Quiz
- Real-time Financial Health Scoring
- Personalized Recommendations
- Financial Data Visualizations
- Secure Data Handling
- Integration with Financial Accounts
- Export Data Functionality

## Technologies Used

- Frontend: React, TypeScript
- Backend: Node.js, Express
- Database: PostgreSQL/MongoDB
- API: OpenAI API
- Deployment: Docker, Kubernetes

## Installation

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL or MongoDB

### Steps

1. Clone the repository
   git clone https://github.com/JonasKhoza/financial-health-app.git

Install dependencies
cd financial-health-app
npm install

Set up environment variables Create a .env file in the root directory and add your database and API keys.
Start the development server
npm start

Usage
1.Register an account.
2.Complete the financial health quiz.
3.View your financial health scores and recommendations on the dashboard.
4.Update your financial information as needed.
5.Export your financial data for further analysis.

Contributing
I welcome contributions!
Please follow the contribution guidelines.

License
This project is licensed under the CUSTOM LICENSE - see the LICENSE file for details.

Code Style
Follow the existing coding style.
Write unit tests for new features or changes.
Ensure your code passes all linting and tests.
