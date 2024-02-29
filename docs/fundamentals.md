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

# Type annotations

型注釈(タイプアノテーション)が必要なのは以下のとおり

- any 型を返す関数

```typescript
const json = `{"x": 10, "y": 20}`;
const coordinates: { x: number; y: number } = JSON.parse(json);
console.log(coordinates);
```

- 変数を 1 行目に宣言して初期化を別の行にするとき

```typescript
let words = ['red', 'green', 'blue'];
let foundWord = false;

for (let i = 0; i < words.length; i++) {
  if (words[i] === 'green') {
    foundWord = true;
  }
}
```

- 変数の型を正しく指定できないとき

```typescript
let num = [-10, -1, 12];
// booleanまたはnumberのどちらかになる
let numberAboveZero: boolean | number = false;

for (let i = 0; i < num.length; i++) {
  if (num[i] > 0) {
    numberAboveZero = num[i];
  }
}
```

- 関数

```typescript
const add = (a: number, b: number): number => {
  return a + b;
};

// voidを入れることで戻り値を定義しなくていい
const logger = (message: string): void => {
  console.log(message);
};
```

# 配列

```typescript
const carMakers = ['ford', 'toyota', 'chevy'];
const carsByMake: string[][] = [];

const cars = carMakers[0];
const myCar = carMakers.pop();

carMakers.map((car: string): string => {
  return car.toUpperCase();
});

// stringまたはDateの配列
const importantDates: (Date | string)[] = [new Date(), '2030-10-10'];
```
