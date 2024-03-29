/**
 * 年の配列を返す関数
 * 
 * @param start 開始年
 * @param end 終了年
 * @returns [2021, 2022, 2023 ...]
 */
function getYearsArray(start: number, end: number): number[] {
    if (start > end) {
        return []
    }
    let years = [];
    for (let i = start; i <= end; i++) {
        years.push(i);
    }
    return years
}

/**
 * 数年毎にかかる費用の配列を返す関数
 *
 * @param start 開始年
 * @param end 終了年
 * @param cost 定期的にかかる金額
 * @param inteval 間隔
 * @param prev 前回工事をおこなったのは何年前か
 * @returns [0, 0, 200000000, 0, 0, 0, ...]
 */
function getYearlyCostsArray(start: number, end: number, cost: number, inteval: number, prev: number): number[] {
    if (start > end) {
        return []
    }
    let years = [];
    for (let i = 0; i < end - start; i++) {
        years.push((i - prev)%inteval == 0 ? cost : 0);
    }
    return years
}

/**
 * 金額配列の足し算(arr1 + arr2)
 *
 * @param start 開始年
 * @param end 終了年
 * @param arr1
 * @param arr2
 * @returns
 */
function getAddedArray(start: number, end: number, arr1: number[], arr2: number[]): number[] {
    if (start > end) {
        return []
    }
    let years = [];
    let span = end - start
    for (let i = 0; i <= span; i++) {
        years.push(arr1[i] + arr2[i]);
    }
    return years
}

/**
 * 金額配列の引き算(arr1 - arr2)
 *
 * @param start 開始年
 * @param end 終了年
 * @param arr1
 * @param arr2
 * @returns
 */
function getSubedArray(start: number, end: number, arr1: number[], arr2: number[]): number[] {
    if (start > end) {
        return []
    }
    let years = [];
    let span = end - start
    for (let i = 0; i <= span; i++) {
        years.push(arr1[i] - arr2[i]);
    }
    return years
}

/**
 * 残高推移を取得する
 *
 * @param start 開始年
 * @param end 終了年
 * @param costArr 予算
 * @param firstValue 初期値
 * @returns
 */
function getBalanceArray(start: number, end: number, costArr: number[], firstValue: number): number[] {
    if (start > end) {
        return []
    }
    let years: number[] = [];
    let span = end - start
    years.push(firstValue);
    for (let i = 1; i <= span; i++) {
        years.push(Number(years[i - 1]) + Number(costArr[i]));
    }
    return years
}

/**
 * 残高推移から表の色を取得する
 *
 * @param start 開始年
 * @param end 終了年
 * @param barance 残高推移
 * @returns
 */
function getColorArray(start: number, end: number, barance: number[]): string[] {
    if (start > end) {
        return []
    }
    let colors: string[] = [];
    let span = end - start
    let good: string = '#56B7AB'; // 基本は緑
    if (!this.isAllGreen(start, end, barance)) {
        good = '#ccc'; // 赤字があるときは灰色
    }
    for (let i = 0; i <= span; i++) {
        let color: string = good;
        if (barance[i] < 0) {
            color = '#F4527D' // 0以下があれば赤
        }
        colors.push(color);
    }
    return colors
}

/**
 * 残高推移から赤字があるかを取得する
 *
 * @param start 開始年
 * @param end 終了年
 * @param barance 残高推移
 * @returns
 */
function isAllGreen(start: number, end: number, barance: number[]): boolean {
    if (start > end) {
        return true
    }
    let span = end - start
    for (let i = 0; i <= span; i++) {
        if (barance[i] < 0) {
            return false
        }
    }
    return true
}

// 関数をエクスポートします。
export default {
    getYearsArray,
    getYearlyCostsArray,
    getAddedArray,
    getSubedArray,
    getBalanceArray,
    getColorArray,
    isAllGreen
};
