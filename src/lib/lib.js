"use strict";
exports.__esModule = true;
/**
 * 年の配列を返す関数
 *
 * @param start 開始年
 * @param end 終了年
 * @returns [2021, 2022, 2023 ...]
 */
function getYearsArray(start, end) {
    if (start > end) {
        return [];
    }
    var years = [];
    for (var i = start; i <= end; i++) {
        years.push(i);
    }
    return years;
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
function getYearlyCostsArray(start, end, cost, inteval, prev) {
    if (start > end) {
        return [];
    }
    var years = [];
    for (var i = 0; i < end - start; i++) {
        years.push((i - prev) % inteval == 0 ? cost : 0);
    }
    return years;
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
function getAddedArray(start, end, arr1, arr2) {
    if (start > end) {
        return [];
    }
    var years = [];
    var span = end - start;
    for (var i = 0; i <= span; i++) {
        years.push(arr1[i] + arr2[i]);
    }
    return years;
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
function getSubedArray(start, end, arr1, arr2) {
    if (start > end) {
        return [];
    }
    var years = [];
    var span = end - start;
    for (var i = 0; i <= span; i++) {
        years.push(arr1[i] - arr2[i]);
    }
    return years;
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
function getBalanceArray(start, end, costArr, firstValue) {
    if (start > end) {
        return [];
    }
    var years = [];
    var span = end - start;
    years.push(firstValue);
    for (var i = 1; i <= span; i++) {
        years.push(Number(years[i - 1]) + Number(costArr[i]));
    }
    return years;
}
// 関数をエクスポートします。
exports["default"] = {
    getYearsArray: getYearsArray,
    getYearlyCostsArray: getYearlyCostsArray,
    getAddedArray: getAddedArray,
    getSubedArray: getSubedArray,
    getBalanceArray: getBalanceArray
};
