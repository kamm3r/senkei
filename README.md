[![Size](https://img.shields.io/bundlephobia/minzip/senkei?label=gzip&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/senkei)
[![Version](https://img.shields.io/npm/v/senkei?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/senkei)
[![Downloads](https://img.shields.io/npm/dt/senkei.svg?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/senkei)

# Senkei

Game dev Math

```bash
npm install senkei
```

```ts
import { Vec3, Quaternion, Mat4, Transform } from 'senkei';

// Unity-like API with PascalCase members.
const point = new Vec3(2, 4, 10);

console.log('add two vectors', Vec3.Add(point, new Vec3(34, 3, 2)));

const t = new Transform();
t.position = new Vec3(0, 1, 0);
t.LookAt(new Vec3(0, 1, 5));
console.log('forward', t.forward);
```

## Documentation

Guides for every class live in [docs/](docs/).
