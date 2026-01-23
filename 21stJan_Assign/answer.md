# Schema Design in Relational Databases

# 1. What schema design is and what a database schema represents

**Schema design** is the process of planning how data will be organized in a relational database before it is implemented. A **database schema** represents the blueprint or structure of the database, including:

* Tables

* Columns (attributes)

* Data types

* Keys (primary & foreign)

* Relationships between tables

* Constraints (e.g., NOT NULL, UNIQUE)

Example:
For an e-commerce app, part of the schema might specify that:

* A users table holds user data

* An orders table holds order records

* Each order belongs to one user

This structural plan is the database schema.

# 2. Why schema design is required before writing backend code

Schema design should come **before backend implementation** because:

* Backend code interacts with data storage

* Data storage must be consistent and predictable

* API and business logic depend on table structure

If developers start writing code without a schema:

* Data access logic becomes unclear

* APIs may need to be rewritten later

* Integration between modules becomes difficult

A well-designed schema ensures:

✔ Clear data flow
✔ Smooth backend development
✔ Fewer refactors and bugs

# 3. How poor schema design impacts data consistency, maintenance, and scalability

Bad schema design can cause serious long-term issues:

## a. Data Consistency Problems

Without proper normalization and constraints:

* Data may be duplicated

* Conflicting records may appear

* Updates may leave stale values

Example: storing user email in multiple tables can lead to mismatched values if updated in only one place.

## b. Maintenance Difficulties

Developers struggle when:

* Table names are unclear

* Relationships are ambiguous

* There are too many exceptions

This increases debugging time and slows development.

c. Scalability Limitations

Poor schemas lead to:

* Slow queries due to bad indexing

* Tables growing uncontrollably

* Difficulty sharding or partitioning data

A good schema enables large-scale systems to grow smoothly.

# 4. What validations are in schema design and why databases enforce validations (for example: NOT NULL, UNIQUE, DEFAULT, PRIMARY KEY)

Validations (also called constraints) ensure data stored in the database meets rules that protect data integrity.

| Constraint  |	           Purpose                       |
| ------------|:----------------------------------------:|
| NOT NULL	  |       Field must have a value            |
| UNIQUE	  |      Prevent duplicate values            |
| PRIMARY KEY |	Unique identifier for each record        |
|FOREIGN KEY  |	Enforce relationships between tables     |
|DEFAULT	  |Assign default values when none provided  |
|CHECK	      |Enforce custom rules (e.g., age > 0)      |

### Why databases enforce validations:

* Prevent invalid or conflicting data

* Ensure relational consistency

* Protect against accidental application bugs

* Centralize validation instead of relying solely on code

Databases provide a last line of defense for data correctness.

# 5. The difference between a database schema and a database table

A **database schema** is the plan or structure of the entire database, defining how data is organized and related.

A **database table** is an actual storage structure that holds data in rows and columns.

Analogy:

* **Schema** = blueprint of a house

* **Table** = actual rooms inside the built house

So schemas describe objects; tables store data.

# 6. Why a table should represent only one entity

Each table should model a **single logical entity** (also called 1NF principle). Examples of entities:

* User

* Product

* Order

* Payment

### Reasons:

** 1. Avoid Data Duplication**
Mixing entities forces repetition and inconsistency.

** 2. Simplify Relationships**
Separate tables allow clean joins and foreign keys.

** 3. Improve Maintainability**
Single responsibility makes schema easier to change.

Example (bad design):
Storing user details inside the orders table mixes entities.

Example (good design):
users and orders in separate tables linked by user_id.

# 7. Why redundant or derived data should be avoided in table design

**Redundant data** means duplicated data stored in multiple places.
**Derived data** means data that can be computed from existing fields.

Problems caused:

* Data inconsistencies

* Wasted storage

* Extra update logic

Example:

❌ Storing total_price in orders if it can be calculated from quantity * unit_price.

Better to compute it dynamically or during query.

Storing redundant or derived data should only be done when there are clear performance reasons and after careful evaluation.

# 8. The importance of choosing correct data types while designing tables

Choosing correct data types affects:

* Storage efficiency

* Query performance

* Validation rules

* Application correctness

Examples:

* Using **INTEGER** for IDs instead of TEXT ensures faster indexing.

* Using **BOOLEAN** for flags instead of storing "yes/no" avoids parsing errors.

* Using **TIMESTAMP** for time fields enables date comparisons.

Bad type choices can cause:

* Slower queries

* Failed joins

* Data loss or truncation

* Storage waste

Correct types help the database optimize indexing and enforce meaningful constraints.