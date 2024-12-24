// /utils/logger.js
const logError = (message, error) => {
    console.error(`Error: ${message}`, error);  // This should be replaced with proper logging in production.
  };
  
  const logInfo = (message) => {
    console.log(`Info: ${message}`);  // Replace with a production-level logger
  };
  
  export { logError, logInfo };