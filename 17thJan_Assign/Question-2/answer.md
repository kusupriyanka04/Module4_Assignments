# Database Relationships
## 1. Definition

A **database relationship** describes how data in one table relates to data in another table.
Relationships are defined using **keys**, mainly:

* **Primary Key (PK):** Unique identifier of a record in a table

* **Foreign Key (FK):** Field that refers to a primary key in another table

Database relationships ensure that data remains **organized, accurate, consistent, and meaningful.**

# Types of Database Relationships

There are **three primary types:**

* One-to-One (1:1)

* One-to-Many (1:N)

* Many-to-Many (M:N)

# 🟦 1. One-to-One (1:1) Relationship

## Definition

In a one-to-one relationship, **a record in Table A is linked to exactly one record in Table B**, and vice versa.

## Example in E-commerce

### Tables:

* customers

* customer_profiles (extra info: gender, DOB, profile picture, etc.)

### Diagram:

customers (PK: customer_id)
        1 ───────────── 1
customer_profiles (FK: customer_id)


## Explanation

Each customer has **one and only one** profile record, and each profile belongs to one customer.

This is useful to separate **sensitive or optional data** into another table.

# 🟦 2. One-to-Many (1:N) Relationship

## Definition

In a one-to-many relationship, **a record in Table A can be linked to multiple records in Table B**, but not vice versa.

## Example in E-commerce

### Tables:

* customers

* orders

### Diagram:

customers (PK: customer_id)
        1 ─────────────∞
orders (FK: customer_id)


## Explanation

A single customer can place **many orders**, but each order belongs to **one customer** only.

This is the **most common** type of relationship in relational databases.

# 🟦 3. Many-to-Many (M:N) Relationship

## Definition

In a many-to-many relationship, **records in Table A can be related to multiple records in Table B**, and vice versa.

To implement M:N relationships, we use a **junction (bridge) table.**

## Example in E-commerce

### Tables:

* products

* categories

* product_categories (junction table)

### Diagram:

products (PK: product_id)     categories (PK: category_id)
         ∞ ────────────── product_categories ───────────── ∞
                           (FK: product_id, category_id)


## Explanation

A product can belong to **multiple categories** (e.g., “Smartphone” in Electronics + Mobiles)

A category can include **multiple products**

Junction table resolves the relationship by storing pairs of IDs.

# ER Diagram for E-Commerce

![ER Diagram](./ERdiagram.png)