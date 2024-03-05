'use strict';

const dcpConfig = dcp['dcp-config'];

/**
 * Deploys a blend file to DCP.
 * Returns a an object containing a jobId and an identityKeystore.
 */
async function deployRender(jobOptions)
{
  const { compute, wallet } = dcp;
  const blendFile = await base64File(jobOptions.file);
  const frames = Array.from({length: jobOptions.numSlices}, (_, i) => i + 1);

  const idKeystore = await new wallet.IdKeystore(null, '');
  wallet.addId(idKeystore);

  //const job = compute.for(Array.from(jobOptions.file.name), (datum) => { progress(); return datum.toUpperCase() });
  const job = compute.for(frames, blendFile);
  job.worktime = 'custom:blender';
  job.customWorktime = true;
  job.greedyEstimation = true;

  job.on('readyStateChange',  (state) => {
    if (state === 'init')
      jobOptions.on.init();
  });
  job.on('error', jobOptions.on.error);

  if (jobOptions.leavePublicGroup)
    job.computeGroups = jobOptions.extraComputeGroups || [];
  else
    job.computeGroups = job.computeGroups.concat(jobOptions.extraComputeGroups);

  console.log(job.computeGroups);

  job.on('accepted', () => {
    console.log(job.id);
  });
  job.on('readystatechange', console.log);

  job.public.name = `blender~worktime~${new Date().toLocaleTimeString()}`;

  const jobId = await deployJob(job, jobOptions.slicePaymentOffer);
  return { jobId, idKeystore };
}

/**
 * Uses the `job.exec` api to deploy a job and returns the jobId.
 * Returns a promise which resolves to the jobId.
 */
function deployJob(job, perSlicePayment)
{
  var outerResolve, outerReject;
  const promise = new Promise((resolve, reject) => {
    outerResolve = resolve;
    outerReject = reject;
  });

  job.on('accepted', () => outerResolve(job.id));
  job.on('error', outerReject);
  job.exec(perSlicePayment).catch(outerReject);

  return promise;
}

/**
 * Converts a File to a base64 string. Returns a promise which
 * resolves to a base64 string.
 */
function base64File(file)
{
  var outerResolve, outerReject;
  const promise = new Promise((resolve, reject) => {
    outerResolve = resolve;
    outerReject = reject;
  });

  // promisify setup reader success and fail callbacks
  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    const base64String = loadEvent.target.result.split(',')[1];
    outerResolve(base64String);
  };
  reader.addEventListener('error', () => {
    outerReject(reader.error);
  });

  // try to read the file
  reader.readAsDataURL(file);

  return promise;
}

/**
 * Gets the status of a job deployed to dcp.
 * @param idKeystoreJSON <String> The id keystore used to deploy the job
 * @param jobId <String> The address of the job
 * @return <Object> bunch of status information
 */
async function jobStatus(idKeystoreJSON, jobId)
{
  const idKeystore = await new dcp.wallet.IdKeystore(idKeystoreJSON);

  const body = {
    operation: 'fetchJobReport',
    data: {
      job:      jobId,
      jobOwner: idKeystore.address,
    }
  };

  const phemeLoc  = dcpConfig.scheduler.services.pheme.location;
  const phemeConn = new dcp.protocol.Connection(phemeLoc, idKeystore);

  const request = new phemeConn.Request(body, idKeystore);
  const data = await phemeConn.send(request);
  const success = data.success;
  phemeConn.close();

  if (!success)
    throw new Error(`Request to fetchJobReport failed for job ${jobId}`);
  return data.payload;
}

async function jobResults(idKeystoreJSON, jobId)
{
  const idKeystore = await new dcp.wallet.IdKeystore(idKeystoreJSON);
  dcp.wallet.addId(idKeystore);
  return dcp.job.fetchResults(jobId);
}

