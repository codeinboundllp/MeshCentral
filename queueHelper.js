const Queue = require('bull');

const myQueue = new Queue('CommunicationQueue', {
    redis: { host: '127.0.0.1', port: 6380 } // Adjust Redis connection settings as needed
});

// Function to add a job to the queue
async function publishQueueJob(sessionId, status) {
    if(sessionId && status){
        await myQueue.add("Update_Session_Status", { session_id: sessionId, status: status });
    }
}

// Function to add a job to the queue and get data
async function getDataQueueJob(sessionid) {
    const job = await myQueue.add("Get_Session_Details", sessionid);
    const data = await job.finished();
    return data;
}

module.exports = { getDataQueueJob, publishQueueJob };