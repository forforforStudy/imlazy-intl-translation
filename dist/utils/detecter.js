"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.includeHan = void 0;
/**
 * 检测是否包含中文
 *
 * @param text 输入文本
 */
function includeHan(text) {
    return /\p{Unified_Ideograph}/u.test(text);
}
exports.includeHan = includeHan;
