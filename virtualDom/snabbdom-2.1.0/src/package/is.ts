/*
 * @Author: LiLangXiong680
 * @Date: 2020-09-13 22:09:56
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-10 17:39:13
 * @FilePath: /plan/virtualDom/snabbdom-2.1.0/src/package/is.ts
 */
export const array = Array.isArray
export function primitive(s: any): s is (string | number) {
  return typeof s === 'string' || typeof s === 'number'
}