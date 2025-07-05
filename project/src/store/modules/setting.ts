import { defineStore } from 'pinia'


const useSettingStore = defineStore('Setting', {
  state: () => ({
    isCollapse: localStorage.getItem('isCollapse') === 'true',
    refresh: false
  }),
  actions: {
    changeFold() {
      this.isCollapse = !this.isCollapse
      localStorage.setItem('isCollapse', String(this.isCollapse))
    },
    setCollapse(value: boolean) {
      this.isCollapse = value
      localStorage.setItem('isCollapse', String(this.isCollapse))
    }
  }
})

export default useSettingStore