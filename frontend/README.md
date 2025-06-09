# Bornov Blogs - Modern Blog Platform

A full-stack blog application built with React, TypeScript, and Material-UI, featuring user authentication, post management, and a responsive design.

## Features

- 🔐 User Authentication (Login/Register)
- 📝 Create, Read, Update, Delete Blog Posts
- 🎨 Modern UI with Material-UI and Tailwind CSS
- 🔄 State Management with Redux + Redux Saga
- 📱 Responsive Design
- ⚡ Fast Development with Vite
- 🔍 Type Safety with TypeScript

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (for backend)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd bornov-blogs/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/        # React components
├── services/         # API and Redux services
│   ├── api/         # API calls
│   └── redux/       # Redux setup
│       ├── sagas/   # Redux sagas
│       ├── slices/  # Redux slices
│       └── store.ts # Redux store
├── types/           # TypeScript types
└── App.tsx         # Root component
```

## Technologies Used

- React 19
- TypeScript
- Material-UI
- Redux Toolkit
- Redux Saga
- Formik + Yup
- Tailwind CSS
- Vite
- Axios

## Authentication

The application uses JWT-based authentication. Tokens are stored in localStorage and automatically included in API requests.

## Development

### Code Style

- ESLint and TypeScript for code quality
- Prettier for code formatting
- Tailwind CSS for styling

### State Management

- Redux Toolkit for state management
- Redux Saga for side effects
- Redux Persist for state persistence

## Production Build

To create a production build:

```bash
npm run build
# or
yarn build
```

The build will be available in the `dist` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
