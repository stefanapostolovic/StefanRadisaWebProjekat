Vue.component("facility", { 
	data: function () {
	    return {
		  id: '',
		
	      facility: {"id":null, "name":null, "objectType":null, "status":null,
	      "location":{"longitude":null,"latitude":null,"address":{}}, 
	      "image":null, "averageRating":null, "startTime":null, "endTime":null},
	      
		  comments:[],
		  trainings:[],
		
		  loggedUser: null
		  
		  //selectedTraining: null
		}
	},
	    template: ` 
    	<div class="center">
			<h3 class="teal darken-2" style="margin-top:10%; margin-bottom:5%">{{facility.name}}</h3>
			<table>
				<tr class="tableRowBorder">
					<th>Logo</th>
					<th>Name</th>
					<th>Type</th>
					<th>Location</th>
					<th>Rating</th>
					<th>Status</th>
				</tr>
				<tr class="tableRowBorder">
					<td width="100%" height="100%"><img alt="fato" v-bind:src="facility.image" 
					width="100px" height="100px"></td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{facility.name}}
						</p>
					</td>
					<td class="kolona">
						{{facility.objectType}}
					</td>
					<td>
						<p style="width:150px;height=150px">
							{{facility.location.address.street+" "+facility.location.address.number}}
						</p>
						<p style="width:150px;height=150px">
							{{facility.location.address.city+"  "+facility.location.address.zipCode}}
						</p>
						<p style="width:150px;height=150px">
							{{facility.location.longitude+",    "+ facility.location.latitude}}
						</p>
					</td>
					<td>
						<p style="width:150px;height=150px">{{facility.averageRating}}</p>
					</td>
					<td v-if="facility.status">Open</td>
					<td v-else="facility.status">Closed</td>
				</tr>
	    	</table>    
	
			<h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%">Training list:</h3>
			<table>
				<tr class="tableRowBorder">
					<th>
						Icon
					</th>
					<th>
						Name
					</th>
					<th>
						Type
					</th>
					<th>
						Description
					</th>
					<th>
						Duration
					</th>
					<th>
						Trainer
					</th>
				</tr>
				<tr v-for="(p, index) in trainings" class="tableRowBorder">
					<td width="100%" height="100%"><img alt="fato" 
					:src="p.image" width="100px" height="100px"></td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{p.name}}
						</p>
					</td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{p.trainingType}}
						</p>
					</td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{p.description}}
						</p>
					</td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{p.duration}}
						</p>
					</td>
					<td v-if="p.trainer.name !== null" class="kolona">
						<p style="width:150px;height=150px">
							{{p.trainer.name + ' ' + p.trainer.surename}}
						</p>
					</td>
					<td v-else>
						<p style="width:150px;height=150px">
							-
						</p>
					</td>
				</tr>
		    </table>    
			<table>
				<tr v-for="(p, index) in comments">
					<td class="kolona">
							{{p.text}}
					</td>
					<td class="kolona">
						{{p.grade}}
					</td>
				</tr>
		    </table>
   		</div>		  
    	`,
    mounted () {
		this.id = localStorage.getItem("selectedFacility");
		
		axios.all([
			this.getLoggedUser(),
			this.getSelectedFacility(),
			this.getAllTrainingsForCurrentFacility()
		])
		.then(axios.spread((first_response, second_response, third_response) => {
			this.loggedUser = first_response.data;
			this.facility = second_response.data;
			this.trainings = third_response.data;
		}))
    },
    methods: {
		getSelectedFacility() {
			return axios.get('rest/facilities/getFacility/' + this.id);
		},
	
		/*changeTraining(selectedTraining) {
			localStorage.setItem("selectedTraining", selectedTraining.id);
			router.push('/viewTraining');
		},*/
		
		SendSelectedTraining() {
			return this.selectedTraining;
		},
		
		getLoggedUser() {
			return axios.get('rest/currentUser');
		},
		
		getAllTrainingsForCurrentFacility() {
			return axios.get('rest/trainings/getTrainingsForSelectedFacility/' + this.id);
		},
		
		createTraining() {
			router.push('/createTraining');	
		},
		
		/*isCorrectManager() {
			//return (this.loggedUser.role === 'Manager' && this.loggedUser.sportFacility.id
			//=== this.facility.id);
			if (this.loggedUser.sportFacility == null) {
				return false;
			}
			else if (this.loggedUser.sportFacility.name === this.facility.name &&
			this.loggedUser.role === 'Manager') {
				return true;
			}
			return false;		
		},*/
	
		radnoVreme : function(p) {
				return "Radno vreme:"+ vreme(p.startTime) +"-"+vreme(p.endTime);
    	},
    
		radi : function(p) {
    		if (p.status === true){
	    		return "Radi";
    		}
    		else
				return "Ne radi";
    	},
    	vreme: function(p) {
			var d =p.toString();   
			return d.toString();	
		},
},
	filters: {
		dateFormat: function(value, format) {
			var parsed = moment(value);
    		return parsed.format(format);
		}
	}
});
