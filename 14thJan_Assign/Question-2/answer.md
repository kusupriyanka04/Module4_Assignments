# Why is db.json not suitable as a database for real projects?

## 1. File-Based Storage Limitations
### No data model or query engine

* A JSON file doesn't support indexing, constraints, joins, or complex queries.

*You must manually read, parse, filter, and write the entire file, which is inefficient and error-prone.

### No concurrent access handling

*Databases are built to handle multiple simultaneous reads/writes.

*A JSON file can easily get corrupted if two processes write to it at once.

## 2. Performance Issues
### Slow read/write operations

*On every write, the whole file may need to be rewritten.

*On every read, the entire file may need to be loaded into memory.

This does not scale when the data grows beyond a small size.

### No indexing

*Searching through records requires scanning the whole file (O(n) time).

*Databases use indexing to get results much faster.

## 3. Scalability Problems
### Single point of storage

*You cannot distribute, shard, or replicate a JSON file reliably across servers.

*Scaling horizontally (adding more machines) is basically impossible.

### In-memory bottlenecks

*If the file gets large, loading it strains memory and I/O.

*Real databases optimize memory usage with caching strategies.

## 4. Reliability and Data Integrity Concerns
### Risk of corruption

*If the app crashes while writing, the JSON can become invalid.

*Databases use journals/transaction logs to ensure durability.

### No transactional support

*No ACID guarantees (Atomicity, Consistency, Isolation, Durability).

*Failed writes can leave your data in a bad or partial state.

### No backups or recovery mechanisms

*You’d need to manually create backup workflows.