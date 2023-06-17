# Senkei

Game dev Math

```bash
npm install senkei
```

```ts
import * as Vec3 from 'senkie';

// default to be Vec3 { 0, 0, 0}
const point = Vec3.create()

point[0] = 2
point[1] = 4
point[2] = 10

console.log('add two vector', Vec3.add(point, Vec3.create(34,3,2))
```
