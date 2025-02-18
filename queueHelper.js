const Queue = require('bull');



// Function to add a job to the queue
async function publishQueueJob(sessionId, status) {
    // Connect to Redis
    const myQueue = new Queue('CommunicationQueue', {
        redis: { host: '127.0.0.1', port: 6379 } // Adjust Redis connection settings as needed
    });
    if(sessionId && status){
        await myQueue.add("Update_Session_Status", { session_id: sessionId, status: status });
    }
    // Disconnect from Redis
    await myQueue.client.quit(); // Disconnect from Redis
}

// Function to add a job to the queue and get data
async function getDataQueueJob(sessionid) {
    // Connect to Redis
    const myQueue = new Queue('CommunicationQueue', {
        redis: { host: '127.0.0.1', port: 6379 } // Adjust Redis connection settings as needed
    });
    const job = await myQueue.add("Get_Session_Details", sessionid);
    const data = await job.finished();
    // Disconnect from Redis
    await myQueue.client.quit(); // Disconnect from Redis
    return data;
}

module.exports = { getDataQueueJob, publishQueueJob };