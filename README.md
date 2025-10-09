# Ilias' CV

A modern, responsive, and customizable digital CV built with ❤️ using web technologies.

🔗 [View the live version](https://cv.iliascreates.com)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Development](#development)
  - [Building](#building)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository hosts the source code for my personal CV, designed to showcase my skills, experience, and projects in a clean and interactive format.  
It's built using modern web technologies to ensure responsiveness and ease of customization.

## Features

- **Responsive Design**: Optimized for both desktop and mobile viewing.
- **Interactive Sections**: Hover effects and collapsible sections for a dynamic user experience.
- **Dark Mode Support**: Toggle between light and dark themes.
- **Customizable Layout**: Easily modify sections to fit your personal information.
- **Print-Friendly**: Includes a print stylesheet for easy offline viewing.

## Tech Stack

- **Frontend**: HTML5, CSS3 (SCSS), JavaScript
- **Build Tools**: Webpack, Babel
- **Package Manager**: Yarn

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nop33/cv.git
cd cv
````

2. Install dependencies:

```bash
yarn install
```

### Development

To start the development server and view the CV locally:

```bash
yarn start
```

This will open the CV in your default browser, typically at `http://localhost:3000`.

### Building

To build the project for production:

```bash
yarn build
```

The optimized files will be available in the `dist/` directory.

## File Structure

```
cv/
├── dist/                  # Compiled and optimized files
├── src/                   # Source files
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable UI components
│   ├── styles/            # SCSS files
│   ├── index.html         # Main HTML file
│   └── index.js           # Entry point for JavaScript
├── .gitignore             # Git ignore file
├── LICENSE                # Project license
├── README.md              # Project documentation
├── build.js               # Build configuration
├── package.json           # Project metadata and dependencies
└── yarn.lock              # Yarn lock file
```

## Contributing

Contributions are welcome! If you'd like to improve this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
