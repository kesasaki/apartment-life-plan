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
 * getLargeRepairCostArray
 * getMediumRepairCostArray
 */
// 関数をエクスポートします。
exports["default"] = {
    getYearsArray: getYearsArray
};
