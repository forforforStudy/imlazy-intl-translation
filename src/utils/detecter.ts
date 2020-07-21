/**
 * 检测是否包含中文
 *
 * @param text 输入文本
 */
export function includeHan(text: string) {
  return /\p{Unified_Ideograph}/u.test(text)
}