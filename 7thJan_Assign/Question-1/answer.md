# a. Package Managers

## What is a package manager?

A **package manager** is a tool that helps developers **install, update, remove,** and **manage** external libraries or dependencies in a project.
**Example:** npm, yarn, pnpm

* It removes the need to manually download files and copy them into a project.

## Why do we need package managers in backend development?

We need package managers because they:

### 1. Make development faster

* You can install libraries (e.g., Express, Mongoose) in seconds instead of writing code from scratch.

### 2. Handle dependencies automatically

* If a library depends on other libraries, the package manager installs them too.

### 3. Maintain consistent versions

* Helps keep all machines using the same versions through package.json.

### 4. Provide security & updates

* You can easily update packages to fix bugs and security issues.

### 5. Enable code reuse

* Developers worldwide share useful code as packages.

## Problems faced if package managers are not used

Without package managers, developers would:

### 1. Download libraries manually

* Finding the right version and placing it correctly becomes hard.

### 2. Manage dependencies manually

* Big libraries depend on many smaller libraries → extremely confusing to track.

### 3. No version control

* Different machines might use different library versions → project breaks.

### 4. Hard to update

* Updating libraries means manually removing old files and downloading new ones.

### 5. Slower development

* Re-implementing code that already exists wastes a lot of time.

# b. NPM (Node Package Manager)

## What is NPM?

NPM stands for **Node Package Manager**.
It is the **default package manager for Node.js** that allows developers to:

* Install external libraries (called packages or modules)

* Share their own packages

* Manage dependencies in a project

##### NPM has two main parts:

1. **NPM CLI** → Command-line tool (used in terminal)

2. **NPM Registry** → Online database of thousands of packages

## Why is NPM important for Node.js applications?

NPM is important because it provides:

### 1. Access to huge package ecosystem

* Node.js applications often need packages like Express, Mongoose, etc.

* With NPM, installing them is one command away.

### 2. Fast development

* Instead of writing everything from scratch, developers reuse existing code.

### 3. Version control

* Helps maintain specific versions of packages to avoid breaking code.

### 4. Easy project setup

* NPM can install all dependencies from one file (package.json).

### 5. Community support

* Thousands of open-source packages created and maintained by developers.

# How NPM helps in managing dependencies

## 1. package.json

* Stores all dependencies of a project

## 2. node_modules folder

* Contains all installed packages and sub-packages

## 3. Versioning

* Allows specific versions to avoid compatibility issues (e.g. 1.2.3)

## 4. Installation commands

**Examples:**

* npm install express → installs express locally

* npm install → installs everything from package.json

## 5. Updating & removing packages

* npm update

* npm uninstall packageName

# c. Backend Project Initialization
## What is the command used to initialize a backend (Node.js) project?

To initialize a new Node.js backend project, we use:

* **npm init**

## What does npm init do?

npm init starts a setup process that:

* Asks questions (like project name, author, version, entry file…)

* Creates a package.json file based on your answers

**This package.json file stores:**

* Project information

* Dependencies

* Scripts

* Version details

It is required for every Node.js project.

# What does npm init -y do?

npm init -y does the same thing, but **automatically answers all questions** with default values. Instead of asking everything interactively, it quickly creates package.json with default settings.

**Example of default package.json created:**

{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "license": "ISC"
}

# d. Files and Folders Created After Project Initialization

When we initialize a Node.js project and install packages, three important files/folders appear:

## 1. package.json

### Purpose

* It is the project configuration file for Node.js.

* It stores:

   * Project name and version

   * Entry file (e.g., index.js)

   * Dependencies (libraries)

   * Scripts (e.g., start commands)

   * Metadata (author, license, etc.)

### Importance

* Helps npm know which libraries the project needs.

* Allows others to install dependencies using just:

**npm install**

## 2. node_modules

### Purpose

This folder stores all installed packages and their sub-packages.

**Example:**
If you install express, node_modules may also include:

* express

* body-parser

* cookie and many other dependencies

### Importance

* Required at runtime so the project can use installed libraries.

## 3. package-lock.json

### Purpose

* Records the exact versions of every installed dependency.

* Locks versions so everyone gets the same setup, even in the future.

### Importance

* Prevents version conflicts

* Ensures consistent installation across machines

* Improves security by tracking dependency sources

## Which files/folders should NOT be pushed to GitHub and why?

## node_modules

Should not be pushed because:

* It is very large (can be hundreds of MBs)

* It can be rebuilt anytime using npm install

* It is specific to your environment and OS

So it must be ignored using .gitignore.

## Which files must be committed and why?

### package.json

Because it:

* Lists all dependencies

* Defines project info and scripts

* Helps others install needed packages easily

### package-lock.json

Because it:

* Locks dependency versions for consistency

* Makes builds stable and reproducible