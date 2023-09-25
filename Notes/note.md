# Nodejs crash course by codezone

## Nodejs Session 1

## Nodejs Session 2

- **File System** how to read and wirte and delete file system.

```javascript
const fs = require("node:fs");

// Read file
fs.readFile(path, encoding, callback); // this fucntion is non-blocking
fs.readFile(path, encoding); // this fucntion is blocking stop execution untill it done task

// Write File
fs.writeFile(path, encoding, callback); // this fucntion is non-blocking
fs.writeFile(path, encoding); // this fucntion is blocking stop execution untill it done task

// Delete file
fs.unlink(path, callback); // this fucntion is non-blocking
fs.unlinkSync(path, callback); // this fucntion is blocking stop execution untill it done task
```

- **Stream** use it to treat with big file by spliting it into pieces

There are two type of stream [readable - writable]

## Nodejs Session 3

LIBUV that used in nodejs to add many feature to it most important is [Thread Pool, Event Loop].

We use Thread Pool to handle the following

- File i/o handle using thread pool (default size 4)

We use Event Loop to handle the following

- Network i/o handle using OS_Kernel (default size 4)
  1. Linux --> epoll
  2. Mac --> kqueue
  3. Windows --> IOCP

## Nodejs Session 4

- Http Methods

  1. createServer
  2. listen
  3. res.write(), res.end(), res.setHeader()
  4. req.url , req.method

- Express

  1. Express function that contain all method for create application routes
  2. Middleware can use it for making logger to all application, specific route and can use npm package that made or that job called (morgan).
  3. Handle code to sperated file [middleware, routes, controller, validation, data].

  ```text

  app:
    controller/
        coursesController.js
    routes/
        coursesRoutes.js
    server.js
  ```
