# LMS: Software Engineer Academy 🎓

A high-performance, full-stack Learning Management System (LMS) designed for independent educators to host, manage, and monetize their own course platforms.

## 🌟 Project Overview
Unlike third-party platforms, this LMS gives the platform owner full control. Built with a **Spring Boot** backend and a **React** frontend, it supports a multi-teacher architecture with revenue-sharing capabilities. Whether you are teaching a Java Masterclass or a Mexican Culinary course, the architecture is niche-flexible and ready to scale.



---

## 🛠 Tech Stack

### Backend (The Engine)
* **Java & Spring Boot**: Core REST API framework.
* **Spring Security**: Robust authentication and Role-Based Access Control (RBAC).
* **Spring Data JPA**: Hibernate-based ORM for database management.
* **MySQL**: Relational database for persistent storage.

### Frontend (The User Interface)
* **React (Vite)**: Fast, modern frontend tooling.
* **TypeScript**: Type-safety across the UI components.
* **Tailwind CSS**: Utility-first styling for a responsive design.
* **React Router**: SPA navigation and protected routes.

### External Integrations
* **Stripe API**: Secure payment processing and checkout flows.

---

## 🚀 Key Features

### For Instructors (Admin & Guests)
* **Management Dashboard**: Full CRUD control over courses and lessons.
* **Content Builder**: Mix text-based theory with embedded video lectures.
* **Revenue Dynamics**: Support for multi-teacher architecture with split-revenue tracking.
* **Analytics**: Real-time metrics for student lists, course sales, and payments.

### For Students
* **Seamless Onboarding**: Secure JWT-based signup and login.
* **Individual Course Purchasing**: Professional checkout flow via Stripe integration.
* **Dynamic Assessment Engine**: Flexible-length quizzes that validate mastery before moving forward.
* **Progress Tracking**: On-demand access to purchased content with secure database unlocking.

---

## 📂 Project Structure
```text
VIRTUAL_ACADEMY/
├── backend/           # Spring Boot Application
├── frontend/          # React + Vite + TS Application
└── README.md 