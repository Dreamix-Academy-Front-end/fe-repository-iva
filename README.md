# Public API Angular Project with Authentication

## Overview

This project is a simple CRUD application that interacts with a `db.json` file containing a collection of posts in JSON format. The application allows users to view, create, edit, and delete posts based on their authentication status. It leverages the **json-server** as a mock backend, and **DaisyUI** for styling, all built on the **Angular** framework.

## Features

- **Public Access:**
  - View the list of posts
  - Search posts by title
  - View details of individual posts
  
- **Authenticated Users:**
  - Create new posts
  - Edit existing posts
  - Delete posts

## Tech Stack

- **Frontend:** Angular
- **Backend:** json-server (mock API with `db.json`)
- **UI Components:** DaisyUI (Tailwind CSS components)

## Authentication

Only authenticated users can perform **create**, **edit**, and **delete** operations on posts. Unauthenticated users can only view and search posts. This project uses a simple login system to control access to these features.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iva7777/public-api-project.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd angular-public-api-project
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run json-server to simulate the API:**
   ```bash
   npx json-server --watch db.json
   ```

5. **Start the Angular app:**
   ```bash
   ng serve
   ```

6. **Access the app:**
   - Open your browser and go to `http://localhost:4200`.

## Usage

- **Public users** can search posts by title and view details.
- **Logged-in users** can create new posts, edit existing posts, and delete posts.

## Screenshots

- **Post List View:**  
  Displays all posts with a search bar.

- **Post Details:**  
  Shows detailed information about a selected post.

- **Create/Edit Post Form:**  
  Logged-in users can submit new posts or update existing ones.