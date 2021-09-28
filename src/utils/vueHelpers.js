import Vue from "vue"

export const abstractComponent = (component, propsData = {}) => {
    const classInstance = Vue.extend(component)
    const instance = new classInstance({ propsData })
    instance.$mount()
    return instance
}
