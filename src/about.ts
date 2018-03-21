import model from "./model";

const app = new Vue({
    el: "#app",
    data: {
        message: `Hello from ${model.name}`
    }
});
