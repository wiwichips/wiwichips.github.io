# Introducing DCP Worktimes

## Alternative execution runtime environments for your DCP compute workloads.

# Distributive Compute Protocol (DCP)

[DCP](https://distributive.network/platform) is a market-based compute orchestration platform. Anyone can contribute their compute resources to the DCP Network and earn cash for computing slices of DCP Jobs (compute workloads) for Job Deployers. Compute providers contribute compute by running a secure JavaScript/WebAssembly runtime called the [DCP Worker](https://distributive.network/workers) which accepts and completes tasks from the DCP Scheduler. In exchange for their computational effort, compute providers are paid in compute credits which are redeemable for cash.

Alternatively, organizations can leverage DCP to utilize their existing infrastructure for compute instead of paying big cloud companies. For instance, Queens University runs DCP Worker instances on workstations in their computer labs so compute heavy research workloads can be executed on existing infrastructure.

Up until now, all workloads on DCP have been executed in JavaScript and WebAssembly. This meant that Job Deployers who need to use another programming language have to work with [Emscripten](https://emscripten.org/), or other WebAssembly toolchains, to get their work into DCP. This is particularly difficult for Job Deployers working with interpreted languages like Python, as it requires setting up an interpreter in WebAssembly \- a complex and time-consuming process.

# DCP Worktimes

This is where DCP WorkTimes come in. WorkTimes enable different runtime environments on DCP, making it easier to run a variety of programming languages and tools.

We are launching with two officially supported WorkTimes: the Map-Basic JavaScript WorkTime, which has been the default so far, and the [Pyodide WorkTime](https://www.youtube.com/), which allows Python workloads to run on DCP.

We will continue to roll out more WorkTimes based on customer needs. Our next release will include a WASI-style environment, designed to enhance the performance and flexibility of WebAssembly execution. We are also exploring the possibility of adding support for more interpreted languages, depending on demand. We've also experimented with a [WebLLM Worktime](https://youtu.be/GrDvYE1y4LU) based on the excellent work done by the [MLC team](https://webllm.mlc.ai/).

Beyond the officially supported WorkTimes, users now have the power to create their own custom WorkTimes. This means that if you have specialized computational needs, you can create a WorkTime that fits them. For example, we’ve built a custom LLama 7b WorkTime using the Ollama project to run distributed AI inferences. We’ve also built a Blender WorkTime, which allows for rendering animations in parallel on DCP. These examples show how flexible and powerful custom WorkTimes can be, allowing users to expand DCP beyond JavaScript and Python, even into fields like machine learning and 3D rendering.

# API

```javascript
const dcp = require('dcp-clinet').initSync();
const compute = require('dcp/compute');

const computeWorkload = `
// basic work workfunction which squares numbers
function workFn(datum) {
	progress();
	return datum * datum;
}
`;

const job = compute.for([1,2,3, 4], computeWorkload);

// specify the worktime here, in this example, the Map Basic Worktime
job.worktime = 'map-basic';

job.exec().then(console.log); // 1, 4, 9, 16
```

