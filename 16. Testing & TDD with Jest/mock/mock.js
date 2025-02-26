describe('Date mocking example', () => {
    // Save the real Date object for later restoration.
    const RealDate = Date;
    // Define a fixed date – this will be our "today".
    const fixedDate = new Date('2025-01-01T00:00:00.000Z');
  
    beforeAll(() => {
      // Override the global Date constructor.
      global.Date = class extends RealDate {
        constructor(date) {
          // If a date is passed, call the real constructor.
          if (date) {
            return super(date);
          }
          // Otherwise, return the fixed date.
          return fixedDate;
        }
      };
  
      // Also override Date.now() to return the fixed timestamp.
      Date.now = jest.fn(() => fixedDate.getTime());
    });
  
    afterAll(() => {
      // Restore the original Date constructor and Date.now.
      global.Date = RealDate;
      jest.restoreAllMocks();
    });
  
    test('new Date() returns the fixed date', () => {
      const today = new Date();
      expect(today).toEqual(fixedDate);
    });
  
    test('Date.now() returns the fixed timestamp', () => {
      expect(Date.now()).toEqual(fixedDate.getTime());
    });
  });