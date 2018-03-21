import { default as _Vue, VNode as _VNode} from "vue";

declare global {
    var Vue: typeof _Vue;
    interface VNode extends _VNode { }
}
