const range = {
    [Symbol.iterator]: function* (start = 1, end = 5) {
      if (start > end) {
        throw new Error("Start number cannot be higher than end number.");
      }
      for (let i = start; i <= end; i++) {
        yield i;
      }
    },
  };
  
  try {
    for (const number of range) {
      console.log(`Number ${number}`);
    }
  } catch (error) {
    console.error(error.message);
  }