[Start] → [GET Desired Temperature FROM User] → [Measure Current Temperature]
             ↓                                   ↑
[Compare Current TO Desired] ←─────── [Wait FOR Interval]
             │
             ├─ IF Current < Desired → [Activate Heater] → [Wait]
             │
             ├─ IF Current > Desired → [Activate AC] → [Wait]
             │  
             └─ IF Current == Desired → [Do Nothing] → [Wait]