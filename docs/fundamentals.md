# Type の種類

- string
  - 文字列
- number
  - 整数、小数、負の数
- boolean
  - 真偽値
- Date
  - 日付

# Primitive Types

TypeScript における基本的な型でそれ以上分解できない単一の値

- number
- boolean
- void
- undefined
- string
- symbol
- null

# Object Types

いくつかの値をまとめたデータのこと

- functions
- arrays
- classes
- objects

# 配列

```typescript
// array
let colors: string[] = ['red', 'green', 'blue'];
let numbers: number[] = [1, 2, 3];
let booleans: boolean[] = [true, false, false];
```

# クラス

```typescript
class Car {}

let car: Car;
```

# オブジェクト

```typescript
// object literal
let point: { x: number; y: number } = {
  x: 10,
  y: 20,
};
```
