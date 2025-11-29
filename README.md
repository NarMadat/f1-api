## 📋 Overview of Tasks and Implementation

### Task 1 – Database Initialization (5 pts)  
Everything is handled automatically through Prisma ORM.  
On application start / migration, the required database schema is created automatically.

### Task 2 – REST API & Basic CRUD (15 pts)  
The API exposes CRUD operations for your data models (teams, stages, results).  
To explore all endpoints, visit:  
http://localhost:3029/api/reference

### Task 3 – Bulk Data-Load Script (15 pts)  
A script generated a large volume of initial data by interacting with your REST API rather than direct DB.  
**Location:** `scripts/data-gen.js`

### Task 4 – Data Migrations (10 pts)  
Only one migration file exists, because the full data model was defined at once and applied.  
That satisfies the requirement of adding migrations (since the initial model and index creation were done).  
**Location of migrations:** inside `apps/api/prisma/migrations`

### Task 5 – Advanced Query Endpoints (25 pts)  
Five specialized REST endpoints were built for advanced queries:  
- **SELECT … WHERE** (multiple conditions)  
- **JOIN** (data combined from multiple tables)  
- **UPDATE** with a non-trivial condition  
- **GROUP BY** (aggregate queries)  
- **Sorting by a specified field**  
All logic is located under: `apps/api/src/modules/results`

### Task 6 – Index (20 pts)
All logic is located under: `apps/api/src/modules/meta-data`

### Task 7 – Pagination (10 pts)
All logic is located under: `apps/api/src/modules/pagination`



