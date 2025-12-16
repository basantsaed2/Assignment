//Part3: Node Internals

//1. What is the Node.js Event Loop ?
/*
- it makes the Node.js Non-blocking and Asynchronous
- It handles asynchronous operations by delegating tasks to the system and processing their results through callbacks
-allowing Node.js to manage thousands of concurrent connections with a single thread.
*/

//2. What is Libuv and What Role Does It Play in Node.js ?
/*
-Libuv is a multi-platform C library that plays a crucial role in Node.js by enabling its non-blocking, event-driven architecture. It provides support for asynchronous I/O operations and powers the event loop, making Node.js highly efficient for handling concurrent tasks.
-Key Features of Libuv
Event Loop: Libuv implements the event loop, which is the core of Node.js's asynchronous nature. It continuously polls for events (like I/O operations, timers, or signals) and executes their respective callbacks. The event loop is divided into phases, such as timers, I/O polling, and callbacks, ensuring smooth execution of tasks.
Libuv facilitates non-blocking I/O operations, allowing Node.js to handle multiple tasks concurrently without waiting for one to finish. This is achieved using callbacks, event-driven programming, and a worker thread pool.
For operations that cannot be performed asynchronously at the OS level (e.g., file system), Libuv uses a thread pool. By default, it has 4 threads, but this can be adjusted using the UV_THREADPOOL_SIZE environment variable.
*/

//3. How Does Node.js Handle Asynchronous Operations Under the Hood?
/*
-Node.js executes JavaScript on a single thread.
-Time-consuming operations (like I/O) are delegated to Node APIs (libuv).
-Once completed, their callbacks are queued and processed by the Event Loop.
*/

//4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js?
/*
-Call Stack
The Call Stack is a LIFO (Last In, First Out) data structure that executes synchronous JavaScript code.
Each function call is pushed onto the stack and removed after execution.

-Event Queue
The Event Queue is a FIFO (First In, First Out) queue that stores callbacks of completed asynchronous operations, such as timers and I/O tasks.
These callbacks wait until the Call Stack becomes empty.

-Event Loop
The Event Loop is a runtime mechanism that continuously monitors the Call Stack and the Event Queue.
When the Call Stack is empty, the Event Loop moves the next callback from the Event Queue to the Call Stack for execution.
*/

//5. What is the Node.js Thread Pool and How to Set the Thread Pool Size?
/*
- The Node.js Thread Pool is a set of background threads used for heavy operationsز
- size can be configured using UV_THREADPOOL_SIZE.
*/

//6. How Does Node.js Handle Blocking and Non-Blocking Code Execution ?
/*
-Blocking code executes directly in the Call Stack
-Non-blocking code is offloaded to:
--OS async APIs, or
--the Thread Pool
-When finished, callbacks are added to the Event Queue
-The Event Loop executes them when the Call Stack is free
*/

