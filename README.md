# 🧬 Evo Gene: Your Personalized Multinodal Health Model

![Project Status: Active](https://img.shields.io/badge/Status-Active-brightgreen)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ Overview

**Evo Gene** is a cutting-edge, multinodal health application designed to deliver deep, personalized health insights through advanced analytical models. Moving far beyond simple tracking, Evo Gene integrates and analyzes complex data streams across key health domains:
- **DNA Analysis & Genomics**
- **Brain Tumor Analysis (Assisted Screening)**

By combining these powerful data sources, Evo Gene generates actionable, model-driven reports to empower users in proactive health management. The application is built using a modern React + Django stack.

---

## 🌟 Key Features

| Feature                  | Description                                                                                   | Core Technology                  |
|--------------------------|-----------------------------------------------------------------------------------------------|----------------------------------|
| **DNA Analysis**         | Generates detailed reports on genetic predispositions, potential risks, and wellness traits based on provided genomic data. | Bioinformatics & Machine Learning |
| **Brain Tumor Analysis** | Utilizes advanced AI models (e.g., CNNs) for preliminary analysis and segmentation of potential abnormalities from medical scans (e.g., MRI/CT). | Computer Vision & Deep Learning  |

> ***Disclaimer:*** *Evo Gene is an informational and auxiliary tool. It is **not** a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for interpretation.*

---

## 🚀 Getting Started

Follow these steps to set up and run the Evo Gene application locally.

### Prerequisites

- **Python 3.10+** (Recommended for Django)
- **Node.js & npm** (Required for React)
- `pip` (Python package installer)

### 💻 Installation & Setup

#### 1. Backend (Django) Setup

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/sharadvyas123/Evo-Gene.git
    cd Evo-Gene/backend
    ```
2. **Create and Activate a Virtual Environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use: venv\Scripts\activate
    ```
3. **Install Django Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4. **Run Migrations:**
    ```bash
    python manage.py migrate
    ```

#### 2. Frontend (React) Setup

1. **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Start the development server:**
    ```bash
    npm start
    ```

### 🏃 Running the Application

- Backend: Runs at `http://localhost:8000`
- Frontend: Runs at `http://localhost:3000`

---

## 🛠️ Technology Stack

| Component              | Stack/Framework       | Purpose                                                      |
|------------------------|----------------------|--------------------------------------------------------------|
| **Backend Framework**  | **Django**           | Robust API development, ORM, and secure handling of health data |
| **Frontend Framework** | **React**            | Dynamic user interface for forms and interactive report visualization |
| **Data Science**       | **TensorFlow / PyTorch** | Deep Learning models for specialized analysis (Brain Tumor, DNA) |
| **Database**           | **PostgreSQL / MySQL / SQLite** | Data storage for user profiles, analysis results, and reports     |

---

## 🤝 Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide for details on our code of conduct and the process for submitting pull requests.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📜 License

Distributed under the **MIT License**. See the `LICENSE` file for more information.


## Team Members -

---------------------------------------------------------
| Kaustubh Srivastava   |   Leader and Backend Engineer |
| Vyas Sharad           |   ML and Backend Engineer     |
| Anmol Srivastava      |   ML Engineer                 |
| Divyansh Kashyap      |   Frontend Engineer           |
---------------------------------------------------------

Project Link: [https://github.com/sharadvyas123/Evo-Gene](https://github.com/sharadvyas123/Evo-Gene)
