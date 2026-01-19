# 1. Why is db.json not suitable as a database for real projects?

## ✅ 1. File-Based Storage Limitations
### No data model or query engine

* A JSON file doesn't support indexing, constraints, joins, or complex queries.

* You must manually read, parse, filter, and write the entire file, which is inefficient and error-prone.

### No concurrent access handling

* Databases are built to handle multiple simultaneous reads/writes.

* A JSON file can easily get corrupted if two processes write to it at once.

## 🚧 2. Performance Issues
### Slow read/write operations

* On every write, the whole file may need to be rewritten.

* On every read, the entire file may need to be loaded into memory.

This does not scale when the data grows beyond a small size.

### No indexing

* Searching through records requires scanning the whole file (O(n) time).

* Databases use indexing to get results much faster.

## 📈 3. Scalability Problems
### Single point of storage

* You cannot distribute, shard, or replicate a JSON file reliably across servers.

* Scaling horizontally (adding more machines) is basically impossible.

### In-memory bottlenecks

* If the file gets large, loading it strains memory and I/O.

* Real databases optimize memory usage with caching strategies.

## 🛑 4. Reliability and Data Integrity Concerns
### Risk of corruption

* If the app crashes while writing, the JSON can become invalid.

* Databases use journals/transaction logs to ensure durability.

### No transactional support

* No ACID guarantees (Atomicity, Consistency, Isolation, Durability).

* Failed writes can leave your data in a bad or partial state.

### No backups or recovery mechanisms

* You’d need to manually create backup workflows.

# 2. What are the ideal characteristics of a database system (apart from just storage)?

Modern database systems do much more than simply store data. To support real-world applications, they provide several important characteristics that ensure fast, safe, and consistent access to information. Here are the ideal characteristics of a robust database system:

## ✅ 1. Performance

A good database must be optimized for fast data access and updates.

* **Efficient querying:** Supports indexes and optimized query execution.

* **Low latency I/O:** Fast read/write operations even under heavy load.

* **Caching mechanisms:** Keeps frequently accessed data in memory.

* **Optimized storage engine:** Reduces disk overhead and improves throughput.

Good performance ensures that applications feel responsive and can support many users at once.

## 🤝 2. Concurrency

Concurrency allows many users or processes to interact with the database at the same time without conflicts. DBMS supports:

* **Simultaneous read/write operations**

* **Locking and multi-version control (MVCC)**

* **Isolation levels to reduce interference**

* **Deadlock detection and prevention**

This ensures data remains consistent even when hundreds or thousands of users are connected.

## 🛡 3. Reliability

Reliability means the database continues to operate correctly without losing data. This is achieved through:

* **Crash recovery mechanisms**

* **Transaction logs or write-ahead logging**

* **Redundant storage (replication)**

* **Secure commit protocols**

Reliable databases ensure that once data is written, it won’t disappear or corrupt easily.

## ✔ 4. Data Integrity

Data integrity ensures the data is accurate, valid, and consistent. A strong DBMS supports:

* **Constraints:** primary key, foreign key, unique, not-null

* **Validation rules**

* **ACID properties:** Atomicity, Consistency, Isolation, Durability

* **Type enforcement**

* **Referential integrity**

This prevents invalid or conflicting data from entering the system.

## 📈 5. Scalability

A scalable system can handle increased load or data growth without degrading performance. Scalability can be:

* **Vertical scaling:** adding more resources to a single server (CPU, RAM)

* **Horizontal scaling:** adding more servers (sharding, clustering)

* **Elastic scaling:** automatic adjustments based on demand

A well-designed database should grow with the application.

## 🧯 6. Fault Tolerance

Fault tolerance ensures the system continues functioning even if parts of it fail. Mechanisms include:

* **Replication/clustering:** duplicate data across nodes

* **Automatic failover:** promotes a standby node when a primary fails

* **Redundant hardware and storage**

* **Distributed consensus protocols (e.g., Raft, Paxos)**

Fault tolerance is critical for high availability systems like finance, e-commerce, or healthcare.

# 3. How many types of databases are there? What are their use cases or applications?

There are many ways to classify databases, but one of the most common high-level distinctions used in modern development is between Relational and Non-Relational (NoSQL) databases. Each type has its own strengths, weaknesses, and ideal use cases.

## 🧩 1. Relational Databases (SQL)
#### Overview

Relational databases store data in structured tables with rows and columns. They use **SQL (Structured Query Language)** for querying and are based on a rigid schema, meaning the data structure is defined in advance.

#### Key Features

* Structured and normalized data

* Strong consistency and integrity

* Support for complex joins and relationships

* ACID-compliant transactions

#### Examples

* **PostgreSQL**

* **MySQL**

* **MariaDB**

* **SQL Server**

* **Oracle Database**

* **SQLite** (often for embedded or mobile use)

#### Best Use Cases

Relational databases shine in use cases where **data consistency, relationships, and structured querying** matter.

✔ **Banking & finance systems**

* Need strict transactional integrity (e.g., money transfers)

✔ **Inventory management**

* Products, suppliers, and stock levels are clearly structured

✔ **CRM and ERP systems**

* Customer records, sales, orders with relational data

✔ **E-commerce platforms**

* Products, users, orders, payment data with constraints

✔ **Government & healthcare systems**

* High integrity, auditing, strong consistency requirements

## 🗃 2. Non-Relational Databases (NoSQL)
#### Overview

NoSQL databases are designed for **flexible data models**, massive scale, and fast performance. They do not rely on fixed schemas and often prioritize availability and horizontal scaling over strict consistency.

#### Main Categories of NoSQL Databases

There are several subtypes, each optimized for different needs:

✳ **Document Stores**

* Store JSON-like objects (documents)

* Flexible structure per document

Examples: **MongoDB, CouchDB, Firestore**

📦 **Key–Value Stores**

* Fast lookups by key

* Very simple model

Examples: **Redis, DynamoDB, Riak**

🌐 **Column-Family Stores**

* Store data in wide column tables (not relational)

* Good for large-scale analytics

Examples: **Cassandra, HBase**

🔗 **Graph Databases**

* Store data as nodes and edges (relationships)

* Optimized for traversing relationships

Examples: **Neo4j, ArangoDB**

#### Best Use Cases

NoSQL databases are ideal when **flexibility, speed, or horizontal scaling** is needed — or when the data doesn’t fit neatly into tables.

✔ **Real-time analytics & logging**

* Column databases like Cassandra handle massive writes

✔ **Social networks & recommendation engines**

* Graph DBs model relationships (friends, likes, follows)

✔ **Mobile & IoT applications**

* Document DBs handle unpredictable schemas and fast iteration

✔ **Caching systems**

* Key-value stores like Redis speed up reads

✔ **E-commerce catalogs**

* Products have diverse attributes that change over time

✔ **Event streaming & telemetry**

* IoT sensors producing huge semi-structured data streams