// 引数と戻り値が共にnumber
// 関数には全て型注釈(タイプアノテーション)が必要
const add = (a: number, b: number) => {
    return a + b;
}

function divide(a: number, b: number): number {
    return a / b;
}

// voidを入れることで戻り値を定義しなくていい
const logger = (message: string): void => {
    console.log(message)
}

const todaysWeather = {
    date: new Date(),
    weather: "sunny"
}

const logWeather = (forecast: {date: Date, weather: string}): void => {
    console.log(forecast.date);
    console.log(forecast.weather);
}

logWeather(todaysWeather)