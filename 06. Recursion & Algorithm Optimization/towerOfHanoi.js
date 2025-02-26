function towerOfHanoi(n, rod1, rod2, rod3) {
    if (n === 1) {
        console.log(`Move disk 1 from ${rod1} to ${rod3}`);
        return;
    }
    
    // Move n-1 disks from rod 1 to rod 2 (using rod 3 as helper)
    towerOfHanoi(n - 1, rod1, rod3, rod2);
    
    // Move the largest disk from rod 1 to rod 3
    console.log(`Move disk ${n} from ${rod1} to ${rod3}`);
    
    // Move n-1 disks from rod 2 to rod 3 (using rod 1 as helper)
    towerOfHanoi(n - 1, rod2, rod1, rod3);
}

// Execution
console.log("Solution for standard 3 disks:");
towerOfHanoi(3, 'rod A', 'rod B', 'rod C');