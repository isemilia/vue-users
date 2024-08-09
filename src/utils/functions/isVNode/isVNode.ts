import { VNode } from 'vue';
function isVNode(value: any): value is VNode {
  return value !== null && typeof value === 'object' && value.__v_isVNode === true;
}


export default isVNode