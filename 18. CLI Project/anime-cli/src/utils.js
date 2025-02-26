// utils.js
export const handleError = (error) => {
    if (error.code === 'ENOTFOUND' || error.message.includes('Failed to fetch')) {
      return 'Error: No internet connection. Please check your network and try again.';
    }
    return `Error: ${error.message}`;
  };