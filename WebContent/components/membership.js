Vue.component("membership", { 
	data: function () {
	    return {
	     memberships:[],
	    }
	},
	    template: ` 
    			<div class="container shrink" style="margin-top:-3%">
    			<h1>Membership</h1>
    			<br></br>
				
				<h3 class="teal darken-2" style="margin-bottom:5%">
					Types of membership
				</h3>
				<table>
					<tr class="tableRowBorder">
						<th>Tip članarine</th>
						<th>Cena</th>
						<th>Dnevni broj termina</th>
						<th>Ukupan broj termina</th>
					</tr>
					<tr v-for="(p, index) in memberships" v-on:click="sentToChild(p) class="tableRowBorder"
					:style="{background: p.isCanceled == true ? '#4a148c' : '#212121'}">
						<td>
							{{p.membershipType}}
						</td>
						<td>
							<p clas="tableRow">
								{{p.price}}
							</p>
						</td>
						<td>
							<p clas="tableRow">
								{{p.numberAppointments}}
							</p>
						</td>
						<td>
							<p clas="tableRow">
								{{p.number}}
							</p>
						</td>
					</tr>
				</table>
				
			</div>  
    	`,
    mounted () {
		axios.get('rest/membership/').then(response =>(this.memberships=response.data))
		
    },
    methods: {  sentToChild:function(p){
			localStorage.setItem("selectedMembership", p.identifier)
			router.push(`/facility`);
		},
		
   }
});