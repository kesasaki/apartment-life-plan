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
    for (let i = start; i <= end; i++) {
        years.push((i - prev)%inteval == 0 ? cost : 0);
    }
    return years
}

// 関数をエクスポートします。
export default {
    getYearsArray,
    getYearlyCostsArray,
  };
