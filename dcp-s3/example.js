#!/usr/bin/env node

const dcp = require('dcp-client').initSync();

const jsonId = '{"version":3,"id":"ecf6f7ea-7d4c-4663-a3c9-ae8b13676a51","address":"d01e923222cc3536eb28fcae1aec554ddb38151c","crypto":{"ciphertext":"91fe34dadabbc30638310b7a2796d3a4980a448fff7487c69069a6325b38bc5b","cipherparams":{"iv":"51f383d7ba909000c9d026ad579603ff"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"3d96473f9ed51eef3e37f87cbc9923d4b11c6d68b45ff1228b92ce7333656f0c","n":1024,"r":8,"p":1},"mac":"aafc03a992924082071d051083140242315ef2d3e702fadef63e13c28aadbd10"},"timestamp":"Sat Mar 30 2024 14:06:14 GMT-0400 (Eastern Daylight Saving Time)"}';

// on pageload
async function setUpJob()
{
  const idKs  = await new dcp.wallet.IdKeystore(jsonId, '');

  dcp.wallet.addId(idKs);

  const job = dcp.compute.for([], (x) => { progress(); return x });
  job.autoClose        = false;
  job.greedyEstimation = true;
  job.on('result', console.log);

  job.exec(0);
  await new Promise((resolve, reject) => {
    job.on('accepted', resolve);
    job.on('error',    reject);
  });

  // can't upload until this is set up
  globalThis.jobHandle = job;

  const workerOptions = {
    paymentAddress:   new dcp.wallet.Address('0x0123456789012345678901234567890123456789'),
    cores:            { cpu: 1 },
    leavePublicGroup: true,
    computeGroups:    [],
    jobAddresses:     [job.id],
  };
  const worker = new dcp.worker.Worker(idKs, workerOptions);
  worker.start();
}

// upload
async function uploadFiles(files)
{
  if (!globalThis.jobHandle)
  {
    // spin until it's ready
    await new Promise((resolve, reject) => {
      setInterval(() => globalThis.jobHandle && resolve(), 0.5 *1000);
      setTimeout(()  => reject, 5 * 1000);
    });
  }

  return dcp.job.addSlices(files, globalThis.jobHandle.id);
}

// get list of jobs deployed
async function getJobsDeployed()
{
  const idKs  = await new dcp.wallet.IdKeystore(jsonId, '');
  const phemeConnection = new dcp.protocol.Connection(dcp['dcp-config'].scheduler.services.pheme, { identity: idKs });
  const requestPayload = {
    statuses: ['cancelled', 'corrupted', 'estimation', 'finished', 'running', 'paused', 'new']
  };
  const { payload } = await phemeConnection.request('listJobs', requestPayload);
  phemeConnection.close();
  return payload;
}

// get results from a job
async function getJobResults()
{

}

async function main()
{
  await setUpJob();
  await uploadFiles([100,200,9]);
  const jobs = await getJobsDeployed();
  debugger;
}

main();

