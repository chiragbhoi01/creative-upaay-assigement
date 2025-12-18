# Creative Upaay TaskBoard 🚀

A robust, production-ready Kanban Dashboard designed for efficient task management. Built with **React (Vite)**, **Redux Toolkit**, and **Firebase**, adhering to strict performance and design standards.

🔗 **Live Demo:** https://creative-upaay.web.app/
🎥 **Video Walkthrough:** https://drive.google.com/file/d/10XbJiKDVu1lJMZjGq7NNdENngnU1-XfF/view?usp=drive_link
---

## 🎯 Project Overview
This project was developed as part of the Creative Upaay Full Stack Hiring Assignment. It replicates the provided Figma design with pixel-perfect precision and includes advanced functionalities like Drag-and-Drop, Authentication, and Real-time updates.

### ✅ Completed Features
This submission covers **Level 1 (Mandatory)** requirements plus **4 Major Level 2 (Bonus)** features to ensure a confirmed interview slot.

#### 🔹 Level 1: Core Functionalities
- **Kanban UI:** 3-Column Layout (To Do, In Progress, Done) matching Figma specs.
- **Task Management:** Create, Edit, and Delete tasks dynamically.
- **Drag & Drop:** Smooth drag-and-drop experience using `@hello-pangea/dnd`.
- **Filtering:** Filter tasks by **Priority** (High, Medium, Low) and **Search** by text.
- **State Persistence:** Data persists locally using Redux + LocalStorage.

#### 🏆 Level 2: Advanced Bonus Features
1.  **🔐 Authentication (Firebase):** Secure Email/Password Login & Sign-up system.
2.  **📅 Due Dates:** Set deadlines for tasks with visual due-date indicators.
3.  **✅ Subtasks:** Create checklists within a task to track granular progress.
4.  **📜 Activity Log:** Tracks history of task creation and status changes.

---

## 🛠 Tech Stack
- **Frontend Framework:** React.js (Vite)
- **Styling:** Tailwind CSS v4 (Responsive & Modern)
- **State Management:** Redux Toolkit
- **Backend/Auth:** Firebase Authentication & Hosting
- **Drag & Drop:** @hello-pangea/dnd
- **Icons:** Lucide React

---

## ⚙️ Installation & Run Locally

Follow these steps to run the project on your local machine:

1.  **Clone the Repository**
    ```bash
    git clone [YOUR_GITHUB_REPO_LINK]
    cd creative-upaay-taskboard
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env` file in the root directory and add your Firebase config (Optional, but recommended for security):
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    ...
    ```

4.  **Start Development Server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

---

## 🧠 Approach & Assumptions

- **Component Structure:** Followed a modular approach (`components/`, `features/`, `pages/`) to ensure scalability and clean code architecture.
- **Authentication:** Integrated **Firebase Auth** instead of a mock login to demonstrate real-world backend integration skills, fulfilling the "Level 2" requirement.
- **Data Flow:** Used **Redux Toolkit** for global state management to handle complex task updates across columns efficiently.
- **Design:** Prioritized **Mobile Responsiveness** alongside the desktop dashboard view.

---

## 📬 Contact
**Candidate:** Chirag Bhoi
**Role Applied:** Full Stack Developer / MERN Stack Developer