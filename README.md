# Safari Match Quest

[aureliabutton]

A vibrant, kid-friendly memory matching game set in a playful jungle environment. This application features a grid of interactive cards that players flip to find matching pairs of cute animal characters, built with a focus on visual excellence and smooth interactivity.

## 🦁 About The Project

Safari Match Quest is a delightful memory card game designed with a "Kid Playful" aesthetic. It features smooth animations, 3D-style UI elements, and a vibrant color palette. The goal is simple: flip cards to find matching pairs of animals while racing against the clock.

The application is built as a modern Single Page Application (SPA) using React and Vite, leveraging Cloudflare Workers for deployment. It demonstrates advanced frontend techniques including complex state management with Zustand and fluid animations with Framer Motion.

## ✨ Key Features

*   **Interactive Game Board**: A responsive grid that adapts automatically between 4x4 (mobile) and 6x6 (desktop) layouts.
*   **3D-Style Cards**: Tactile card designs with "flip" animations and 3D bottom borders for a clickable feel.
*   **Dynamic HUD**: Real-time Heads-Up Display showing current Score, Timer, and game status.
*   **Victory Celebration**: A rewarding victory overlay featuring confetti effects and star ratings based on performance.
*   **Playful Aesthetic**: Designed with rounded corners, thick borders, and high-saturation colors (Green, Orange, Yellow) to engage users.
*   **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.

## 🛠️ Technology Stack

*   **Framework**: React 18 + Vite
*   **Styling**: Tailwind CSS v3
*   **UI Components**: Shadcn UI + Radix Primitives
*   **State Management**: Zustand
*   **Animations**: Framer Motion + Canvas Confetti
*   **Icons**: Lucide React
*   **Runtime/Deployment**: Cloudflare Workers

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

*   Node.js (v18 or higher)
*   Bun (v1.0 or higher)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/safari-match-quest.git
    cd safari-match-quest
    ```

2.  Install dependencies:
    ```bash
    bun install
    ```

### Development

To start the local development server:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

## 📂 Project Structure

```text
src/
├── components/         # React components
│   ├── layout/         # Layout wrappers
│   └── ui/             # Reusable UI components (Shadcn)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helper functions
├── pages/              # Page components
├── App.css             # Global styles
└── main.tsx            # Entry point
worker/                 # Cloudflare Worker backend logic
```

## 📦 Deployment

This project is configured for deployment on Cloudflare Workers.

### Quick Deploy

You can deploy this project immediately using the button below:

[aureliabutton]

### Manual Deployment

1.  Build the project:
    ```bash
    bun run build
    ```

2.  Deploy using Wrangler:
    ```bash
    bun run deploy
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.