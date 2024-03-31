#!/usr/bin/env node

//const dcp = require('dcp-client').initSync();

const jsonId = '{"version":3,"id":"0a49c2c7-06c9-4509-998d-6f75ea46704c","address":"7fb51b40ccb1137990c1745833edf9e834e291d7","crypto":{"ciphertext":"958e0e5410ba7af19f79edc7cbd683cf049cbbd19b9e390cdbbab45c671f95af","cipherparams":{"iv":"34b80931f88e62d3990fc304b06802f7"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"7d20e26d7992fdd65d9bf2c0d9abbd6834deaf4113dfb21c5bfe171c514158a3","n":1024,"r":8,"p":1},"mac":"c4930e12222b84253b6f0d8bdd2884d0b2608656857b1d4cb12669b298b5cb91"},"timestamp":"Sat Mar 30 2024 16:21:36 GMT-0400 (Eastern Daylight Saving Time)"}';

// upload
async function uploadFile(file)
{
  const idKs  = await new dcp.wallet.IdKeystore(jsonId, '');
  dcp.wallet.addId(idKs);
  dcp.wallet.add(idKs);

  const slices = [{ name: file.name, time: new Date(), mime: file.mime, size: file.size }, file];

  const job = dcp.compute.for(slices, (x) => { progress(); return x });
  job.greedyEstimation = true;
  job.on('result', console.log);
  job.on('readystatechange', console.log);

  // deploy job
  const jobPromise = job.exec(0);
  await new Promise((resolve, reject) => {
    job.on('accepted', resolve);
    job.on('error',    (e) => { console.log(e); reject(e)});
  });

  const workerOptions = {
    paymentAddress:   new dcp.wallet.Address('0x0123456789012345678901234567890123456789'),
    cores:            { cpu: 1 },
    leavePublicGroup: true,
    computeGroups:    [],
    jobAddresses:     [job.id],
    watchdogInterval: 500, // fast pinging for new work
  };
  const worker = new dcp.worker.Worker(idKs, workerOptions);
  worker.start();
  await jobPromise;
  worker.stop();

  return file;
}

// get list of jobs deployed
async function getJobsDeployed()
{
  const idKs  = await new dcp.wallet.IdKeystore(jsonId, '');
  dcp.wallet.addId(idKs);
  const phemeConnection = new dcp.protocol.Connection(dcp['dcp-config'].scheduler.services.pheme, { identity: idKs });
  const requestPayload = {
    statuses: ['finished']
  };
  const { payload } = await phemeConnection.request('listJobs', requestPayload);

  phemeConnection.close();
  return payload;
}

// get results from a job
async function getJobResults(jobId, sliceNumber)
{
  const idKs  = await new dcp.wallet.IdKeystore(jsonId, '');
  dcp.wallet.addId(idKs);

  const RangeObject = dcp['range-object'].RangeObject;

  if (!sliceNumber)
    return dcp.job.fetchResults(jobId);

  return dcp.job.fetchResults(jobId, new RangeObject(sliceNumber, sliceNumber));
}

function serializeFile(file)
{
  file.contents = btoa(file.contents);  
  file.encoding = 'base64';
  return file;
}

function deserializeFile(file)
{
  if (!file && !file?.encoding)
    return file?.contents;
  if (file.encoding === 'base64')
    return atob(file.contents);
  else if (file.encoding === 'plaintext')
    return file.contents;
  else
    console.log('not supported');
  return file.contents;
}

async function cancelJob(jobId)
{
  const idKs  = await new dcp.wallet.IdKeystore(jsonId, '');
  dcp.wallet.addId(idKs);

  const jsConfig = dcp['dcp-config'].scheduler.services.jobSubmit;
  const jobSubmitConnection = new dcp.protocol.Connection(jsConfig, { identity: idKs });
  const cancelPayload = { job: new dcp.wallet.Address(jobId) };
  const cancelResponse = await jobSubmitConnection.request('cancelJob', cancelPayload);
  console.log(cancelResponse);
  jobSubmitConnection.close();
}

/*
async function main()
{
 // await uploadFile(serializeFile({name: 'will.txt', contents: 'kthen'}));
  const jobs = await getJobsDeployed();
  const jobsResultsPromises = [];
  for (const job of jobs)
  {
    const rizz = await getJobResults(job.jobAddress);
    const filename = rizz?.find(x=>x.slice === 1).value;
    console.log(deserializeFile(file));
  }
}

main();
*/
