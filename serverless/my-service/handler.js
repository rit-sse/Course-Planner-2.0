'use strict';

// Helper so we just throw errors or return what we want
function handleErrors(fn) {
  return async (event, context) => {
    try {
      const data = await fn(event, context);
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    }
    catch(error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error.message }),
      };
    }
  }
}

// Add new filepaths to this array
['auth']
  .forEach(name => module.exports[name] = handleErrors(require('./'+name)));