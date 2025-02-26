/**
 * Handles errors and provides user-friendly messages.
 * @param {Error} error - The error object.
 * @returns {string} - A user-friendly error message.
 */
export const handleError = (error) => {
    if (
        error.code === "ENOTFOUND" || error.message.includes("Failed to fetch")
    ) {
        return "Error: No internet connection. Please check your network and try again.";
    }

    // Handle HTTP errors
    if (error.response) {
        const { status } = error.response;
        switch (status) {
            case 400:
                return "Error: Bad request. Please check your input and try again.";
            case 404:
                return "Error: Resource not found. Please check the anime name or genre and try again.";
            case 410:
                return "Error: Resource no longer available. Please try another search.";
            case 420:
                return "Error: Rate limit exceeded. Please wait and try again later.";
            case 500:
                return "Error: Internal server error. Please try again later.";
            default:
                return `Error: HTTP error! Status: ${status}`;
            case 429:
                return "Error: API rate limit exceeded. Please try again later.";
        }
    }

    // Handle other errors
    return `Error: ${error.message}`;
};
