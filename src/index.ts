import model from "./model"

const mycomponent = Vue.extend({
    data() {
        return { msg: "Hello " };
    },
    methods: {
        greet(): string {
            return this.msg + model.name;
        }
    },
    computed: {
        greeting(): string {
            return `${this.greet()}. How's the weather in ${model.city}`;
        }
    },
    render(createElement): VNode {
        return createElement('div', this.greeting)
    }
});

var instance = new mycomponent({ el: "#app" });
