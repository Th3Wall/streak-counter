# `@th3wall/streak-counter` - a basic streak counter

This is a basic streak counter - inspired by Duolingo - written in TypeScript and meant for the browser (uses `localStorage`).

## Install

```shell
yarn add @th3wall/streak-counter
```

```shell
npm install @th3wall/streak-counter
```

```typescript
import { streakCounter } from "@th3wall/streak-counter";
const today = new Date();
const streak = streakCounter(localStorage, today);
// streak returns an object:
// {
//    currentCount: 1,
//    lastLoginDate: "11/11/2021",
//    startDate: "11/11/2021",
// }
```