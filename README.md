[![Size](https://img.shields.io/bundlephobia/minzip/senkei?label=gzip&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/senkei)
[![Version](https://img.shields.io/npm/v/senkei?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/senkei)
[![Downloads](https://img.shields.io/npm/dt/senkei.svg?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/senkei)

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
