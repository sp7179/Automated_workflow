# 🧠 HR Workflow Designer (React Flow)

A visual workflow builder that enables HR teams to design, configure, and simulate internal processes such as onboarding, approvals, and automated actions.

This project is built as part of a Full Stack Engineering Internship assessment, focusing on scalable frontend architecture, dynamic form handling, and workflow simulation.

---

## 🎯 Objective

The goal of this project is to build a mini workflow designer that allows users to:

* Visually construct workflows using a node-based interface
* Configure each step dynamically using structured forms
* Simulate execution of workflows through a sandbox environment

The system emphasizes clean architecture, modular design, and extensibility.

---

## 🧩 Core Features

### 1. 🖥️ Workflow Canvas (React Flow)

* Drag-and-drop node creation
* Edge connections between nodes
* Node selection and deletion
* Graph-based workflow structure
* Basic validation (e.g., Start node must be first)

Supported Node Types:

* Start Node
* Task Node
* Approval Node
* Automated Step Node
* End Node

---

### 2. ⚙️ Dynamic Node Configuration Panel

Each node is fully configurable via a dynamic form panel.

#### Start Node

* Title
* Metadata (key-value pairs)

#### Task Node

* Title (required)
* Description
* Assignee
* Due Date
* Custom Fields

#### Approval Node

* Title
* Approver Role
* Auto-approve Threshold

#### Automated Step Node

* Title
* Action Selection (from API)
* Dynamic Parameters (based on selected action)

#### End Node

* End Message
* Summary Toggle

---

### 3. 🔌 Mock API Layer

Simulated backend using local mock APIs:

#### `GET /automations`

Returns available automation actions:

```json
[
  { "id": "send_email", "label": "Send Email", "params": ["to", "subject"] },
  { "id": "generate_doc", "label": "Generate Document", "params": ["template", "recipient"] }
]
```

#### `POST /simulate`

* Accepts serialized workflow JSON
* Returns step-by-step execution log

---

### 4. 🧪 Workflow Simulation Sandbox

* Serializes entire workflow graph
* Sends data to `/simulate`
* Displays execution steps
* Performs basic validation:

  * Missing connections
  * Invalid node order
  * Cycle detection

---

## 🏗️ Architecture

```
src/
│
├── components/        # UI components (nodes, panels, canvas)
├── nodes/             # Custom node implementations
├── hooks/             # Reusable logic (state, graph handling)
├── services/          # API layer abstraction
├── utils/             # Graph validation, helpers
├── store/             # State management (if used)
└── pages/             # Main application views
```

### Key Design Principles:

* Separation of concerns
* Reusable hooks
* Type-safe data structures
* Extensible node system

---

## ⚡ Tech Stack

* Frontend: React + TypeScript
* Framework: Vite / Next.js
* Workflow Engine: React Flow
* Styling: Tailwind CSS
* State Management: Context / Zustand / Redux (if used)
* Mock API: Local mocks / JSON server / MSW

---

## 🧠 Key Engineering Decisions

* React Flow for flexible node-based UI and graph handling
* Dynamic forms using controlled components for scalability
* Workflow stored as JSON graph for easy serialization and simulation
* Mock API abstraction layer for future backend integration

---

## 📊 Evaluation Alignment

| Area            | Implementation                            |
| --------------- | ----------------------------------------- |
| React Flow      | Custom nodes, edge handling, interactions |
| Architecture    | Modular folder structure, reusable hooks  |
| Forms           | Dynamic, type-safe configuration panels   |
| API Integration | Mock APIs with async handling             |
| Scalability     | Extensible node system                    |
| Problem Solving | Graph validation & workflow simulation    |

---

## ▶️ How to Run

```bash
npm install
npm run dev
```

---

## 🚧 Future Improvements

* Export / Import workflow JSON
* Undo / Redo functionality
* Auto-layout algorithms
* Visual validation indicators
* Node templates
* Mini-map & zoom controls

---

## 📌 Notes

* This is a frontend-focused prototype
* No authentication or persistence is implemented
* Designed with extensibility for production systems

---

## 🧑‍💻 Author

SHOURISH PAUL

---

## 📄 License

This project is for assessment and educational purposes.
