import { defineStore } from 'pinia'
export const useDateSelectStore = defineStore('dateSelect', {
    state: () => ({
        date: new Date(),
    }),
    getters: {
        dateFormatted() {
            return this.date.toLocaleDateString()
        }
    },
    actions: {
        setDate(date) {
            this.date = date
        }
    },
    watch: {
        date() {
            console.log('date changed')
        }
    },

})
