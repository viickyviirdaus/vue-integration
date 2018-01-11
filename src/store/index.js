import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const store = new Vuex.Store({ //Seperti repository
  state: {
    count: 0,
    customers: [],
    CustomerByAddress: []
  },
  mutations: { //Yang ngehandle perubahan dari state, ini seperti service
    increment (state) {
      state.count++
    },
    getData (state) {
		const URL = '/api/customer'
    	axios.get(URL)
					.then(response => {
						console.log('Hi im response', response.data)
						state.customers = response.data
					})
					.catch(error => {
						console.log(error)
					})
    },
    getDataByCustomer (state, customerId) {
    const URL = '/api/customer/'+customerId+'/address'
      axios.get(URL)
          .then(response => {
            console.log('Hi im response', response.data)
            state.CustomerByAddress = response.data
          })
          .catch(error => {
            console.log(error)
          })
    }
  },
  getters: { // Untuk mengambil nilai dari state
  	getCount: (state) => {
  		return state.count
  	},
  	getCustomers: (state) => {
  		return state.customers
  	},
    getCustomersByAddress: (state) => {
      return state.customers
    }
  },
  actions: {
  	doAlert: () => {
  		// alert("hi im am alert from the same action")
  	},
  	doIncrement: ({commit , dispatch}) => {
  		commit('increment'),
		dispatch('doAlert')
  	},
  	getData: ({commit}) => {
  		commit('getData')
  	},
    getDataByCustomer: ({commit, customerId}) => {
      commit('getCustomersByAddress('+ customerId +')')
      alert(customerId) 
    }
  }
})

export default store