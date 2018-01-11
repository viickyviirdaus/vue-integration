<template>
			<div class="columns is-mobile">
		    <div class="column is-half is-offset-one-quarter">
		    <div class="field">
		      <p class="control has-icons-left has-icons-right">
		        <input class="input" placeholder="Name Customer">
		        <span class="icon is-small is-left">
		      <i class="fas fa-user"></i>
		    </span>
		        <span class="icon is-small is-right">
		    </span>
		      </p>
		    </div>
		    <div class="field">
		      <p class="control has-icons-left">
		        <input class="input" placeholder="Country">
		        <span class="icon is-small is-left">
		      <i class="fas fa-flag"></i>
		    </span>
		      </p>
		    </div>
		    <div class="field">
		      <p class="control has-icons-left">
		        <input class="input" placeholder="Provice">
		        <span class="icon is-small is-left">
		      <i class="fas fa-map"></i>
		    </span>
		      </p>
		    </div>
		    <div class="field">
		      <p class="control has-icons-left">
		        <input class="input" placeholder="City">
		        <span class="icon is-small is-left">
		      <i class="fas fa-home"></i>
		    </span>
		      </p>
		    </div>
		    <div class="field">
		      <p class="control has-icons-left">
		        <input class="input" placeholder="Address">
		        <span class="icon is-small is-left">
		      <i class="fas fa-map-marker"></i>
		    </span>
		      </p>
		    </div>
		    <div class="field">
		      <p class="control">
		        <button class="button is-link" @click="handleSaveCustomer">Submit</button>
		        <button class="button is-link" @click="handelCustomerClickAPI">Lihat Customer</button>
		      </p>
		    </div>
		    <table class="table">
		      <thead>
		      <tr>
		        <th>Id</th>
		        <th>Name</th>
		        <th>Address</th>
		        <th>Action</th>
		      </tr>
		      </thead>
		      <tbody v-for="customer in customers">
		        <td>{{ customer.id }}</td>
		        <td>{{ customer.name }}</td>
		        <td>
		          <button class="button is-link" @click="handleDetailCusomer(item.id)">Detil Dan Edit</button>
		        </td>
		        <td>
		          <button class="button is-link" @click="handleDeleteCusomer(item.id)">Delete</button>
		        </td>
		      </tbody>
		    </table>
		    </div>
		  </div>
		<div class="field" v-for="item in customerWithAddress">
				<div class="control">
					<input v-model="item.customer.id" readonly="true" class="input" type="text" placeholder="Text input">
				</div>
				<label class="label">Name</label>
				<div class="control">
					<input v-model="item.customer.name" class="input" type="text" placeholder="Text input">
				</div>
				<label class="label">Street</label>
				<div class="control">
					<input v-model="item.street" class="input" type="text" placeholder="Text input">
				</div>
				<label class="label">City</label>
				<div class="control">
					<input v-model="item.city" class="input" type="text" placeholder="Text input">
				</div>
				<label class="label">Province</label>
				<div class="control">
					<input v-model="item.province" class="input" type="text" placeholder="Text input">
				</div>
				<label class="label">Country</label>
				<div class="control">
					<input v-model="item.country" class="input" type="text" placeholder="Text input">
				</div>
				<div class="field is-grouped">
					<div class="control">
						<button class="button is-link" @click="handleEditCustomer(item.customer.id)">Submit</button>
					</div>
				</div>
		</div>
				
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'
	export default{
		name: 'LearnVuex',
		data () {
			return {
				customerWithAddress: []
			}
		},
		computed: {
			...mapGetters([
				'getCustomers',
				
				]),
		},
		methods: {
			handelCustomerClickAPI () {
				this.$store.dispatch('getData');
			},
			handleSaveCustomer: function () {
				const URL = '/api/customer'
				axios.post(URL, {
					name: this.name,
					address: {
						country: this.country,
						province: this.province,
						city: this.city,
						street: this.street
					}
				})
					.then(response => {
						alert('success')
					})
					.catch(error => {
						alert(error)
					})
			},
			handleDetailCusomer (id) {
				const URL = '/api/customer/'+id+'/address'
				axios.get(URL)
				.then(response => {
					console.log('Hi im response', response.data)
					this.customerWithAddress = response.data
				})
				.catch(error => {
					console.log(error)
				})
			},
			handleDeleteCusomer (id) {
				const URL = '/api/customer/'+id
				axios.delete(URL)
					.then(response => {
						alert('success')
					})
					.catch(error => {
						alert(error)
					})
			},
			handleEditCustomer (id) {
				const URL = '/api/customer/'+id
				axios.put(URL, {
					name: this.item.customer.name,
					address: {
						country: this.item.country,
						province: this.item.province,
						city: this.item.city,
						street: this.item.street
					}
				})
					.then(response => {
						alert('success')
					})
					.catch(error => {
						alert(error)
					})
			}
		}
	}	
	
</script>