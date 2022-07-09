Vue.component("listMembership", {
	data: function() {
		return {
			allMemberships: [],
			customer: {}
		}
	},
	
	template:
		`
			<div class="container">
				<h3 class="teal darken-2" style="margin-top:10%; margin-bottom:10%; text-align:center">
					Membership list
				</h3>
				
				<table style="margin-bottom: 10%">
					<tr class="tableRowBorder">
						<th>Identifier</th>
						<th>Membership type</th>
						<th>Payment date</th>
						<th>Expiration date</th>
						<th>Price</th>
						<th>Status</th>
						<th>Number of uses</th>
						<th>Customer</th>
						<th></th>
					</tr>
					<tr v-for="(p, index) in allMemberships" v-if="p.isDeleted == false"
					class="tableRowBorderBoth">
						<td>{{p.identifier}}</td>
						<td>{{p.membershipType}}</td>
						<td>{{p.paymentDate}}</td>
						<td>{{p.expirationDate}}</td>
						<td>{{p.price}}</td>
						<td>{{p.status}}</td>
						<td>{{p.numberAppointments}}</td>
						<td>{{p.user.name + ' ' + p.user.surename}}</td>
						<td>
							<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
				    		  @click="deleteMembership(p)"
				    		  style="margin-right: 0; margin-left:auto; display:block;">
				    		  <i class="material-icons">cancel</i>
				    		</a>
						</td>
					</tr>
				</table>
			</div>
		`,
	mounted() {
		axios
			.get('rest/getCustomerMemberships')
			.then(response => {
				this.allMemberships = response.data;
				console.log(response.data);
			})
	},
	
	methods: {
		deleteMembership(membership) {
			axios
				.get('rest/getUser/' + membership.user.username)
				.then(response => {
					this.customer = response.data;
					membership.isDeleted = true;
					this.customer.membership = membership;
					return axios.put('rest/updateUserKeepSession/' + this.customer.username
					, this.customer);
				})
				.then(response => {
					console.log(response.data);
					router.push('/listMembership');
				})
		}
	}
});