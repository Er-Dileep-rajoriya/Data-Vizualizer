# 📊 Data Ingestion, Visualization, and React Integration with Cube.js

This project demonstrates a full data pipeline implementation using **PostgreSQL**, **Cube.js**, and **React.js**. It includes ingesting CSV data into a PostgreSQL database, modeling and generating charts using Cube.js, and displaying these charts in a React-based UI.

---

## 🚀 Features

- ✅ Data ingestion from CSV into PostgreSQL
- ✅ Cube.js integration for data modeling and chart generation
- ✅ React.js frontend to display:
  - Line chart (value over time)
  - Bar chart (value distribution by name)
  - Pie chart (percentage distribution by name)
- ✅ Filters and dashboard view
- ✅ Routing and responsive navigation

---

## 📁 Project Structure

```
root/
├── backend/with database connection
│   ├── cube.js (Cube.js project)
│   ├── .env
│   └── model/and other files
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js and other files
├── README.md
```

---

## 1️⃣ PostgreSQL Setup

### 🔧 Installation

Supabase PostgreSQL:
--Go to Supabase and get the Connection string.

### 🛠️ Create Database and Table

CREATE DATABASE metrics;

\c cube_demo;

CREATE TABLE metrics (
id SERIAL PRIMARY KEY,
name VARCHAR(100),
value NUMERIC,
timestamp TIMESTAMP
);

INSERT INTO metrics (name, value, timestamp) VALUES
('Product 1', 120, '2024-04-01 10:00:00'),
('Product 2', 80, '2024-04-01 11:00:00'),
('Product 3', 100, '2024-04-02 10:00:00'),
('Product 4', 140, '2024-04-02 12:00:00'),

````

---

## 2️⃣ Cube.js Setup

### 🔧 Installation

```bash
npm install -g cubejs-cli
cubejs create cube-backend -d postgres
cd cube-backend
````

### ⚙️ Configuration

Update `.env`:

```env
CUBEJS_DB_TYPE=postgres
CUBEJS_DB_HOST=localhost
CUBEJS_DB_PORT=5432
CUBEJS_DB_NAME=cube_demo
CUBEJS_DB_USER=postgres
CUBEJS_DB_PASS=yourpassword
CUBEJS_DEV_MODE=true
```

### 🧠 Data Schema

Create schema file `schema/Metrics.js or metrics.yml`:

```Metrics.yml file
cube(`Metrics`, {
  sql: `SELECT * FROM metrics`,

  measures: {
    totalValue: {
      type: `sum`,
      sql: `value`,
    },
  },

  dimensions: {
    name: {
      type: `string`,
      sql: `name`,
    },
    timestamp: {
      type: `time`,
      sql: `timestamp`,
    },
  },
});
```

### ▶️ Start Cube.js

```bash
npm run dev
```

---

## 3️⃣ React Frontend Setup

### ⚙️ Create App & Install Dependencies

```bash
npx create-react-app cube-frontend
cd cube-frontend

npm install @cubejs-client/core @cubejs-client/react recharts react-router-dom
```

### 🧩 Add Cube.js Client

```js
// src/cubejs.js
import cubejs from "@cubejs-client/core";

const cubejsApi = cubejs("YOUR-CUBEJS-TOKEN", {
  apiUrl: "http://localhost:4000/cubejs-api/v1",
});

export default cubejsApi;
```

### 📊 Chart Components

Create components for:

- `LineChartComponent.js`
- `BarChartComponent.js`
- `PieChartComponent.js`

Use `@cubejs-client/react` and `recharts` for rendering charts.

### 🧭 Routing + Navbar

Set up `react-router-dom` for navigating between chart views and add a Navbar.

---

## 4️⃣ Additional Features (Good to Have)

- ✅ Filters using dropdowns/date pickers
- ✅ Dashboard view to show all charts
- ✅ Loading spinners
- ✅ Error boundaries and messages

---

## 🖥️ Run the Project

### Start PostgreSQL (if not already) if you have local environment setup otherwise use supabase

## Prepare .env file for frontend

VITE_CUBE_API_URL=http://localhost:4000/cubejs-api/v1

# VITE_CUBE_API_URL=Your database url

VITE_CUBE_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDM4ODQyOTUsImV4cCI6MTc0Mzk3MDY5NX0.NsGFVxLCJw4OAY3a2doWk61O1KimT8h5lkNA7jiH1Rw
VITE_CUBE_QUERY={"measures":["Metric.count","Metric.total_value"],"timeDimensions":[{"dimension":"Metric.timestamp","granularity":"day"}]}
VITE_CUBE_PIVOT_CONFIG={"x":["Metric.timestamp.day"],"y":["measures"],"fillMissingDates":true,"joinDateRange":false}
VITE_CHART_TYPE=bar
VITE_CUBE_API_USE_WEBSOCKETS=false
VITE_CUBE_API_USE_SUBSCRIPTION=false

```bash
sudo service postgresql start
```

### Start Cube.js backend

```bash
cd backend
npm run dev
```

### Start React frontend

```bash
cd frontend
npm start
```

---

## 📦 Dependencies

- PostgreSQL
- Cube.js
- React
- @cubejs-client/core
- @cubejs-client/react
- React Router DOM

---

## 📄 License

This project is open-source and free to use for educational and demonstration purposes.

---

## 🙌 Author

**Dileep Rajoriya**  
Frontend Developer | React Enthusiast  
Feel free to connect and collaborate!
