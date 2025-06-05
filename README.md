
# 🧩 Task Board Application

A responsive and dynamic **Task Board Application** built using **React**, **Vite**, **TypeScript**, and **TailwindCSS (shadcn/ui)**. This project allows users within an organization to visually manage tasks using boards, columns, and cards.

### 🔗 Live Demo

👉 [Click here to view the live application](https://your-live-link.vercel.app)

---

## 📌 Features

### ✅ Board View (Home Page)
- Create new boards.
- View all boards in a tabular layout.
- Navigate to individual board detail pages by clicking on a board.

### ✅ Board Detail Page
- Create multiple columns (like **To Do**, **In Progress**, **Done**).
- Add, edit, delete tasks (cards) inside each column.
- Tasks include:
  - Title
  - Description
  - Creator name
  - Assignee
  - Priority tag (High, Medium, Low)
  - Due date
- Move tasks between columns (drag-and-drop).
- Reorder tasks within columns.
- Edit and delete both columns and tasks.

---

## ⚙️ Tech Stack

| Tool         | Description                                |
|--------------|--------------------------------------------|
| React        | UI Library                                 |
| Vite         | Frontend build tool                        |
| TypeScript   | Type safety                                |
| TailwindCSS  | Utility-first CSS                          |
| shadcn/ui    | Pre-built accessible UI components         |
| **Redux**    | Global state management                    |
| Redux Toolkit| Simplified Redux setup                     |

---

## 🚀 Getting Started

### 📦 Clone the Repository
```bash
git clone https://github.com/DivyaP1063/task-board-app.git
cd task-board-app
```

### 📦 Install Dependencies
```bash
npm install
# or
yarn install
```

### 🔧 Run the App Locally
```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173`

---

## 🧠 Optimizations

- Efficient data structure for boards, columns, and tasks in Redux.
- Memoized selectors and components.
- State persisted to localStorage for resilience on refresh.
- Modular Redux slices for scalability.
- Optional pagination/filtering for large task sets.

---

## 🎁 Bonus Features (If Implemented)

- ✅ Drag-and-drop task movement
- ✅ Task markdown support
- ✅ Search & filter by priority, due date, or assignee

---


## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 📞 Contact

**Author:** Divya Prakash 
**Email:** divyaprakash1063@gmail.com  
**GitHub:** [@DivyaP1063](https://github.com/DivyaP1063)
