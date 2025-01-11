# Python Execution in DCP

### Introducing the Pyodide Worktime: a Python execution runtime environment for DCP

## Introduction

[DCP](https://distributive.network/platform) (Distributive Compute Protocol) is a market-based compute orchestration platform where users can contribute or utilize existing infrastructure to execute compute-heavy workloads, earning cash or optimizing resource usage. Previously, DCP only supported JavaScript and WebAssembly since workers are based on JavaScript engines, making it challenging for users of other languages to run workloads without complex WebAssembly toolchains or big JavaScript re-writes. 

A lack of support for native Python workloads in DCP has been a major missing component. Data Scientists and Researchers love Python due its rich ecosystem for scientific compute. Porting or re-writing python projects to WebAssembly and JavaScript is a non-starter for users who depend on this ecosystem and need a simple solution. Researchers can't afford to spend time compiling a Python interpreter to WebAssembly, interfacing with it through JavaScript, and managing Python dependencies themselves. 

## The Pyodide Worktime

We're excited to announce the launch of the Pyodide Worktime, a new [DCP Worktime](http://../worktimes) which adds firstclass support for Python execution on DCP. 

With the Pyodide Worktime, Job Deployers can write their compute workloads in Python and leverage a long list of the Python popular Python packages supported by Pyodide like Numpy, SciPy, Pandas, PIL, OpenCV and more. The Pyodide Worktime also supports an in memory filesystem enabling project source code and resources to be uploaded via Tarballs and modified during execution of Job's slice.

The Pyodide Worktime is proud to be based on the incredible [Pyodide project](https://github.com/pyodide/pyodide). Pyodide is a Python interpreter based on CPython compiled to WebAssembly. It's embeddable in JavaScript runtimes and browsers and provides high level interoperation between JavaScript and Python types. Being based on Pyodide means we get support for an ever growing list of Python packages which have been ported to WebAssembly.

Since Pyodide runs inside a JavaScript/WASM runtime, we maintain all the security benefits present with JavaScript and WebAssembly workloads while getting a native feeling Python runtime environment for our users.

Combined with our new Python SDK for distributed computing on DCP, with the Pyodide Worktime, Python is now a first class option for researchers and developers deploying projects on DCP.

## Using the Pyodide Worktime from the Python SDK

In the Python SDK for DCP, the Pyodide Worktime is the default flavour for compute workloads. Here is an example application which calculates the fibonacci sequence from 1 to 10\.
```javascript
console.log('hello world');  
```

## Using the Pyodide Worktime from the JavaScript SDK

When deploying jobs using the Pyodide Worktime from the JavaScript SDK, a few notable changes are required. The main differences lie in how code, program flow, how static job arguments are handled. First off, the Python code is deployed via a string instead of passing raw Python functions. Additionally, Python Work Functions are expressed as Python programs where an entrypoint callback function is passed to the `dcp.set_slice_handler` function. Static job arguments are passed to the Python program via the program's argument vector. This means in order to access static job argument data programs must read from `sys.argv`. Finally, since the JavaScript "Map-Basic" Worktime is enabled by default via the JavaScript SDK, the Job Deployer needs to set the Worktime to "Pyodide".

```javascript
console.log('hello world');  
```

## How the Pyodide Worktime Works

The Pyodide Worktime is embedded and shipped with every DCP Worker. If you start a new browser based worker instance on [https://dcp.work](https://dcp.work), Pyodide will load and the worker will be able to execute either Map Basic and Pyodide workloads (along with additional future Worktimes yet to be released). We've been shipping Pyodide with our workers since February and have been making several improvements to the performance and Worktime along the way.

Despite now being embedded in every DCP Worker, the Pyodide Worktime began life as a really big JavaScript Work Funtion. This made prototyping simple during development of the worktime and is how we intend future DCP Worktimes to be developed. Shipping Pyodide in the worker instead of as status job argument data associated with each job means Jobs can contain only the minimal Python code needed to execute and need not include the 50mb Pyodide binary inside them.

The Pyodide Worktime is the first new worktime to be added to DCP, but more will come in the future \- stay tuned\!

## Try the Pyodide Worktime Today

The easiest way to try is through Distributive's Python SDK. Install it with `pip3 install dcp`
