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

### Session 6

- **jsend:** just standard for sending response in readable way

- **req.query:**
  query would be something like thais: http://localhost:3030/?limit=2&page=1
  get from req query variable [limit, page]

- **Pagination**:

```javascript
const limit = req.query.limit ?? 3;
const page = req.query.page ?? 1;
// equation of skip be like: (page-1)*limit
const skip = (page - 1) * limit;
find({}, { _id: false, __v: false }).limit(limit).skip(skip);
```

- **Handle Request that doesn't Exist**

override express handler for request that doesn't exist

```javascript
app.all("*", (req, res, next) => {
  // jsend specification
  res
    .status(404)
    .json({ status: "error", message: "resourse is not availabe" });
  next();
});
```

- **cors npm pakeage**
  cors is corss origin resourse share that policie prevent two diffierent port/origin to talk to each other

```javascript
app.use(cors());
```

- **async handler**:

In this section there are two thing:

1. async wrapper to handle try and catch and send error to the middleware

```javascript
(fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch((error) => {
      next(error);
    });
  };
};

// recive error into middleware be like that:
// put it in the last server file...
app.use(error, req,res,next){
  res.status(5000) etc...
}


```

2. making custom error class that extend for error

```javascript
class appError extend error {

  constructor(){
    super();
  }

  create(message, statusCode, statusText){
    this.message = message;
    this.statusCode = statusCode;
    this.statusText = statusText;
    return this;
  }
}

```

- Making utilts Folder that contain file return statusCodeText and file return customError...

---

### Session 8

- Make schema and user validator npm package to validate email and can make more thing...
