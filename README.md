# Docker Explainer: A Visual Journey into Containers

A highly interactive, animated visualization that explains Docker concepts—from the abstract to the concrete—through a dynamic, browser-based simulation of the containerization process. This project re-imagines the technical documentation of Docker, making it accessible, engaging, and easy to understand for developers, students, and technical enthusiasts.

## ✨ Key Features

- **Interactive Step-by-Step Learning**: Follow the journey of a Docker container, from an image to a running instance, with clear, sequential stages.
- **Dynamic Container Creation**: Watch as a Dockerfile is parsed, an image is built layer-by-layer, and a container is spun up in real-time.
- **Live Container Management**: Interact with running containers—start, stop, pause, and delete them—to understand Docker's lifecycle and orchestration.
- **Core Concept Visualization**:
  - **Volumes**: See how data persists across container lifecycles.
  - **Networking**: Visualize the bridge network, ports, and how containers communicate.
  - **Dockerfile Anatomy**: Explore the instructions (`FROM`, `COPY`, `CMD`, etc.) and their impact on the build process.
- **Modern, Responsive Design**: A sleek, dark-themed interface built with **Vite**, **Vanilla JavaScript**, and **CSS Custom Properties** for a premium, fluid user experience.
- **GitHub Pages Ready**: Optimized for performance and easily deployable.

## 🚀 Quick Start

To run this project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) (or the port indicated) in your browser.

## 🏗️ Architecture

The project is built with a clean separation of concerns:
- **`src/main.js`**: The entry point, handling initialization and routing.
- **`src/components/`**: Reusable UI components like `VisualStage`, `ControlPanel`, etc.
- **`src/views/`**: Different conceptual stages of the Docker journey:
  - `DockerfileView.js`: Explains Dockerfile instructions.
  - `BuildView.js`: Visualizes the image build process.
  - `RunView.js`: Demonstrates running and managing containers.
- **`src/services/`**: The core logic for the Docker engine simulation.
- **`src/assets/`**: Images and styles.

## 🎨 Styling

The UI is designed with a "Cyberpunk Terminal" aesthetic:
- **Theme**: Dark mode with high-contrast accents.
- **Typography**: 'Bricolage Grotesque' for headings, 'JetBrains Mono' for code and data.
- **Layout**: Responsive design that works seamlessly on both desktop and mobile.

## 📦 Development

This project uses **Vite**, a next-generation front-end toolchain.
- For production build: `npm run build`
- To preview the production build locally: `npm run preview`

## 🎯 Deployment

To deploy to GitHub Pages, simply push your changes to the `main` branch. The included GitHub Actions workflow will automatically build and deploy the site.
