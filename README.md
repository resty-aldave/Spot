# SPOT 📍

> **A real-time space-finder connecting students and organizations with available, underutilized local SMEs and community hubs to optimize urban efficiency and reduce travel waste.**

![Spot](https://i.postimg.cc/vH912d74/spot-preview.png)

## 🚀 The Problem
Students and organizations waste countless hours and energy searching for available spaces for studying, meetings, or events. Meanwhile, local Small and Medium Enterprises (SMEs) possess "hidden gem" spaces that often sit empty, resulting in lost revenue and inefficient use of urban infrastructure.

## 💡 The Solution
**SPOT** is a dual-sided digital marketplace. 
* **For Users:** A real-time compass to check vacancy, noise levels, and easily book spaces—whether for a single student or a 50-person event.
* **For SMEs:** A high-visibility advertising platform and live dashboard to manage space capacity, attract consistent foot traffic, and maximize their resources.

## ✨ Key Features

### 👤 User Experience (Seekers)
* **Real-Time Availability:** View live occupancy rates for local cafes, workspaces, and hubs.
* **Smart Booking System:** Seamlessly book individual seats, group tables, or an entire venue.
* **Dynamic Fee Estimation:** Automatically calculate costs based on headcounts or exclusive event pricing.
* **Location & Amenities:** Filter spots by location, noise levels, and available amenities.

### 🏢 Business Dashboard (SMEs)
* **Live Occupancy Tracking:** Instantly update space availability with a simple `[+]` / `[-]` interface.
* **Space Management:** Add, edit, or remove specific tables, rooms, and seating areas.
* **Analytics Preview:** Track monthly bookings and overall venue capacity in one clean dashboard.

## 🛠️ Tech Stack
* **Frontend:** React, Vite, TypeScript
* **Styling:** Tailwind CSS ("Urban Minimalist" UI: Slate-900, Mustard Yellow, Pure White)
* **Icons:** Font Awesome, Lucide React
* **Backend/Data:** Local First via `json-server` (`db.json`) for rapid prototyping and real-time state demonstration.
* **Routing:** React Router DOM

## 🌱 SDG Alignment
This project was built with a commitment to a sustainable future:
* **SDG 11 (Sustainable Cities and Communities):** Optimizing existing urban infrastructure and reducing the carbon footprint of unnecessary travel.
* **SDG 12 (Responsible Consumption and Production):** Helping local businesses maximize the utility of their physical spaces and resources.

## 💻 Getting Started (Local Development)

To run this project locally for the hackathon demo:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YourUsername/Spot.git](https://github.com/YourUsername/Spot.git)
   cd Spot

2. **Install dependencies:**
   ```bash
    npm install

3. **Start the Development Server:**
   ```bash
    npm run dev

4. **Start the JSON Server (for database simulation):**
Open a second terminal and run:
   ```bash
    npx json-server --watch src/data/db.json --port 3001

## 🎨 Visual Identity
Built with an "Urban Minimalist" design philosophy to ensure accessibility and professionalism.

* **Primary Accent:** #EAB308 (Mustard Yellow)
* **Text & Dark Elements:** #0F172A (Navy/Slate)
* **Backgrounds:** #FFFFFF (Pure White)

Built with passion and the Laban spirit for the 2026 Hackathon.