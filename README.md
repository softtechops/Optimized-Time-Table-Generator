# 🗓️ Optimized Time Table Generator

An automated, intelligent scheduling and class timetable generation system for universities and colleges. Built with a clean modern UI, conflict-free period allocation, venue capacity management, and dedicated portals for **Administrators**, **Faculty & Staff**, and **Students**.

---

## ✨ Features

- **🏛️ Department & Semester Management**: Configure multiple departments (CSE, ECE, IT, ME, etc.) and semesters with cascading updates.
- **👨‍🏫 Faculty Allocation**: Assign specialized faculty members to specific departmental courses and semesters.
- **🏫 Venue & Lab Scheduling**: Track classroom seating capacity and assign dedicated department lecture halls and labs.
- **⚡ Automated Timetable Engine**:
  - Automatically generates a balanced Monday–Friday schedule with 6 lecture periods and morning/lunch break intervals.
  - Automatically matches subjects with assigned professors and venues.
  - Conflict-free allocation preventing period clashing.
- **📱 Multi-Role Dashboards**:
  - **Admin Dashboard**: Manage constraints, add/edit/delete entities, monitor live metrics, and generate/publish timetables.
  - **Faculty & Staff Portal**: Search and view departmental lecture timetables.
  - **Student Dashboard**: Filter by department and semester to view personalized weekly class schedules.
- **🖨️ Print & PDF Ready**: Dedicated print layout formatted for standard A4 institution timetable distribution.
- **💾 LocalStorage Persistence**: Automatically persists configurations with instant sample seed data ready on first launch.

---

## 🔑 Demo Credentials

| Role | Username / ID | Password | Access Details |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `password` | Full administrative control & generator |
| **Student** | `7376221EC241` *(or any)* | `student123` | View semester schedule |
| **Faculty / Staff** | Enter Name (e.g. `Dr. K. Sharma`) | *None required* | Direct departmental schedule view |

---

## 🚀 Getting Started

### Option 1: One-Click Run (Windows)
Double-click `run.bat` to launch the local web server and automatically open the application in your default web browser.

### Option 2: Python HTTP Server
```bash
python server.py
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.

### Option 3: Direct Browser Launch
Open `index.html` or `login.html` directly in any modern browser (Chrome, Edge, Firefox, Safari).

---

## 📁 Project Structure

```text
Optimized-Time-Table-Generator/
├── index.html                 # Portal entry point & router
├── login.html                 # Role selection portal
├── admin-login.html           # Administrator login
├── admin-dashboard.html       # Full management dashboard
├── student-login.html         # Student portal login
├── student-dashboard.html     # Student timetable viewer
├── staff-login.html           # Faculty schedule viewer
├── staff-dashboard.html       # Faculty schedule display
├── timetable_display.html     # Print-ready official timetable sheet
├── add_department.html        # Department management utility
├── add_semester.html          # Semester configuration utility
├── styles.css                 # Modern UI design system
├── script.js                  # Scheduling algorithm & state persistence
├── server.py                  # Local Python server script
├── run.bat                    # One-click Windows launch script
└── README.md                  # Project documentation
```

---

## 🌐 Deploy to GitHub Pages

1. In your repository on GitHub, navigate to **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select `Deploy from a branch`.
3. Choose the `main` branch and `/ (root)` folder.
4. Click **Save**. Your timetable application will be live at:
   `https://softtechops.github.io/Optimized-Time-Table-Generator/`

---

## 📄 License
This project is open-source and available under the MIT License.
