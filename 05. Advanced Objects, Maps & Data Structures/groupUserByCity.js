function groupUsersByCity(users) {
    const cityMap = new Map();
    
    for (const user of users) {
      const { city } = user;
      
      if (!cityMap.has(city)) {
        cityMap.set(city, []);
      }
      cityMap.get(city).push(user);
    }
    
    return cityMap;
  }
  
  // Execution
  const users = [
    { id: 1, name: 'Alice', city: 'Paris' },
    { id: 2, name: 'Bob', city: 'London' },
    { id: 3, name: 'Charlie', city: 'Paris' }
  ];
  
  console.log(groupUsersByCity(users));