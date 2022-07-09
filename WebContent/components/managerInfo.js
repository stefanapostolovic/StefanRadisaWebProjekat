Vue.component("managerInfo", {
	data: function () {
		return {
			id: '',
			
			facility: {"id":null, "name":null, "objectType":null, "status":null,
	        "location":{"longitude":null,"latitude":null,"address":{}}, 
	        "image":null, "averageRating":null, "startTime":null, "endTime":null},
	        
	        trainings: [],
	        trainers: [],
		
		    loggedUser: null
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
					<tr class="tableRowBorder" v-if="facility.isDeleted == false">
						<td>
							<img alt="fato" v-bind:src="facility.image" width="100px" height="100px">
						</td>
						<td class="kolona">
							<p style="width:150px;height=150px">
								{{facility.name}}
							</p>
						</td>
						<td>
							<p style="width:150px;height=150px">{{facility.objectType}}</p>	
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
						Time
					</th>
					<th>
						Duration (hours)
					</th>
					<th>
						Trainer
					</th>
				</tr>
				<tr v-for="(p, index) in trainings" 
				v-if="p.isDeleted == false"
				@click="changeTraining(p)" class="tableRowBorder">
					<td><img alt="fato" 
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
							{{p.trainingTime}}
						</p>
					</td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{p.duration}}
						</p>
					</td>
					<td v-if="p.trainer !== null" class="kolona">
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
		    <p style="margin-top:2cm; margin-bottom:3cm;">
			    
			    	<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
		    		  @click="createTraining"
		    		  style="margin-right: 0; margin-left:auto; display:block;">
		    		  	<i class="material-icons">add</i>
		    		</a>
			    </p>
		    <h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%">Trainer list</h3>
		    <table>
		    	<tr class="tableRowBorder">	
		    		<th>Ime</th>
		    		<th>Prezime</th>
		    		<th>Pol</th>
		    		<th>Datum rodjenja</th>
		    	</tr>
		    	<tr v-for="(p, index) in trainers"
		    	v-if="p.isDeleted == false" 
		    	class="tableRowBorder">
		    		<td>
		    			<p class="tableRow">{{p.name}}</p>
		    		</td>
		    		<td>
		    			<p class="tableRow">{{p.surename}}</p>
		    		</td>
		    		<td>
		    			<p class="tableRow">{{p.gender}}</p>
		    		</td>
		    		<td>
		    			<p class="tableRow">{{p.dateOfBirth}}</p>
		    		</td>
		    	</tr>
		    </table>
		    <h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%">Customer list</h3>
		    <table>
		    	<tr class="tableRowBorder">	
		    		<th>Ime</th>
		    		<th>Prezime</th>
		    		<th>Pol</th>
		    		<th>Datum rodjenja</th>
		    		<th>Poeni</th>
		    		<th>Tip kupca</th>
		    	</tr>
		    </table>
			</div>
		`,
		
		mounted () {	
			axios
				.get('rest/currentUser')
				.then(response => {
					this.loggedUser = response.data;
					this.id = this.loggedUser.sportFacility.id
					return axios.get('rest/facilities/getFacility/' + this.id)
				})
				.then(response => {
					this.facility = response.data;
					return axios.get('rest/trainings/getTrainingsForSelectedFacility/' + this.id);
				})
				.then(response => {
					this.trainings = response.data;
					this.trainings.forEach(this.getTrainingTrainer);
				})
		},
		
		methods: {
			getTrainingTrainer(item, index) {
				//DODAO//
				if (item.isDeleted == true || item.trainer == null) return;
				
				var obj = this.trainers.filter(function(elem) {
					if(elem.name === item.trainer.name) {
						return item.trainer.name;
					}
				});
				if (obj.length == 0) this.trainers.push(item.trainer);
			},
			
			changeTraining(selectedTraining) {
				localStorage.setItem("selectedTraining", selectedTraining.id);
				router.push('/viewTraining');
			},
			
			getLoggedUser() {
				return axios.get('rest/currentUser');
			},
			
			getAllTrainingsForCurrentFacility() {
				return axios.get('rest/trainings/getTrainingsForSelectedFacility/' + this.id);
			},
			
			createTraining() {
				localStorage.setItem("selectedFacility", this.id)
				router.push('/createTraining');	
			},
		},
		
		filters: {
			dateFormat: function(value, format) {
				var parsed = moment(value);
	    		return parsed.format(format);
			}
		}
});









