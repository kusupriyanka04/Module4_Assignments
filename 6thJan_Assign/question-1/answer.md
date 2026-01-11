# 1. Node.js Architecture

Node.js follows an architecture designed for high performance and scalability. Unlike traditional backend systems that rely on multi-threading to handle many requests, Node.js uses a single-threaded, event-driven model powered by the Event Loop. This makes it excellent for building fast and real-time applications like chat apps, streaming platforms, and online games.

## 1. JavaScript Engine (V8):

The V8 engine is a program that runs JavaScript code.

* It was made by Google for Chrome

* Node.js uses it to run JavaScript outside the browser

* It makes JavaScript fast by turning it into machine code

## 2. Node.js Core APIs:

Node.js has built-in tools called Core APIs that help developers do important tasks.

* Read and write files

* Create web servers

* Work with the operating system

* Handle security (like hashing)

### Examples of Core API modules:

* fs (file system)

* http (web server)

* path (file paths)

* os (system info)

## 3. Native Bindings:

JavaScript cannot directly talk to the operating system, so Node.js uses Native Bindings as a bridge.

* They connect JavaScript to code written in C/C++

* This allows access to low-level system features (like file handling)

* Without this, JavaScript alone could not do backend tasks

So basically:
JavaScript → Native Bindings → Operating System

## 4. Event Loop:

The Event Loop lets Node.js handle many requests at the same time without blocking.

1. Node.js gets a request

2. If it’s a quick task, it runs immediately

3. If it’s a long task (like reading a file), it sends it to the system

4. While waiting, Node.js handles other requests

5. When the long task is done, Event Loop processes the result

Because of this, Node.js can serve thousands of users at once.

# 2. libuv:

## 1. What is libuv?

libuv is a library written in C language that helps Node.js handle tasks in the background.
It gives Node.js the ability to work with things like files, networks, and timers without blocking the main thread.

* libuv makes Node.js capable of doing non-blocking (asynchronous) work.

## 2. Why Node.js needs libuv

JavaScript itself can only run one task at a time (single-threaded).
But in real life, a server needs to do many things, such as:

* Read/write files

* Connect to databases

* Handle network requests

If JavaScript tried to do all these directly, it would block and become slow.

So Node.js uses libuv to:

* Run heavy tasks in the background
* Keep JavaScript free to handle new requests
* Make Node.js fast and scalable

## 3. Responsibilities of libuv

libuv does many important jobs, such as:

**1. Event Loop**

* It manages the Event Loop, which allows asynchronous operations.

**2. Thread Pool**

* It provides a pool of background threads to handle slow tasks like:

    * File system operations

    * DNS lookups

**3. Asynchronous I/O**

* It handles non-blocking input/output operations so Node.js doesn’t wait around.

**4. Network Operations**

* Manages TCP/UDP networking (useful for servers).

**5. Timers**

* Handles functions like setTimeout() and setInterval().

# 3. Thread Pool

## 1. What is a Thread Pool?

A thread pool is a group of worker threads that are ready to perform tasks in the background.Instead of creating a new thread every time (which is slow), the system reuses threads from the pool to do work.This makes programs faster and more efficient.

* Thread pool = a set of reusable worker threads doing background tasks.

## 2. Why Node.js Uses a Thread Pool

Node.js runs JavaScript on one main thread.
But some tasks take a long time, such as:

* Reading or writing files

* Compressing data

* DNS lookups

If JavaScript did all of this on the main thread, it would block and slow down the entire app.

So Node.js uses a thread pool (from libuv) to:
* Move heavy tasks to background threads
* Keep the main thread free
* Allow many operations to run at the same time
* Make Node.js fast and non-blocking

## 3. Which Operations Are Handled by the Thread Pool

Node.js sends certain types of tasks to the thread pool, including:

**File System Operations**

Examples: fs.readFile(), fs.writeFile()

**DNS Operations (non-network)**

Example: DNS lookup without network calls

**Compression & Encryption**

**Examples:**

* zlib compression

* crypto hashing (like PBKDF2)

# Worker Threads
## 1. What are worker threads?

Worker threads are separate threads in Node.js that can run JavaScript code in the background. 

Unlike the main thread (which runs your normal JS code), worker threads allow you to:

* Run heavy JS work separately

* Avoid blocking the main thread

**Worker threads = extra JS workers running code in parallel.**

## 2. Why are worker threads needed?

JavaScript usually runs on a single main thread, so heavy tasks like:

* Large data processing

* CPU-heavy calculations

* Image processing

* Machine learning tasks

can **freeze** the event loop and slow down the whole application.

## 3. Difference Between Thread Pool and Worker Threads

### Thread Pool:

* The thread pool is an internal set of background threads managed by libuv, and developers do not manually create or control them.

* The thread pool is used mainly for system or I/O related work such as file operations, DNS lookups, and cryptographic functions.

* The thread pool does not run JavaScript code — it handles tasks that would block the event loop if done on the main thread.

### Worker Threads:

* Worker threads, on the other hand, are explicitly created by developers using the worker_threads module.

* Worker threads are used to run JavaScript code in parallel, especially for CPU-heavy tasks like data processing or mathematical computation.

* Worker threads help prevent CPU-heavy JavaScript code from blocking the main thread, making Node.js applications more responsive.

# Event Loop Queues

In JavaScript (and Node.js), when asynchronous tasks are scheduled, they are placed into different queues. The two main ones are:

* Macro Task Queue

* Micro Task Queue

Both are handled by the Event Loop, but they do not run with the same priority.

# 1. Macro Task Queue

The Macro Task Queue (also called Task Queue) stores larger asynchronous tasks that usually involve timers or I/O operations.

Macro tasks are executed one at a time, and after each one completes, the event loop checks for micro tasks.

**Examples of macro tasks:**

* setTimeout()

* setInterval()

* setImmediate()

* I/O callbacks (like file system operations)

* Script execution (main file)

* requestAnimationFrame() (in browser)

# 2. Micro Task Queue

The Micro Task Queue stores smaller, fast, high-priority async callbacks such as promises.

Micro tasks are executed immediately after the current code finishes running and before the event loop picks the next macro task.

**Examples of micro tasks:**

* Promise.then()

* Promise.catch()

* Promise.finally()

* process.nextTick() (Node.js specific)

* MutationObserver() (in browser)

# 3. Execution Priority Between Them

Micro tasks have higher priority than macro tasks.

* The execution order works like this:

* Run main script (synchronous code)

* Run all micro tasks

* Pick one macro task and run it

* Run all micro tasks again

* Repeat…

**Micro tasks run before the next macro task is processed.**

