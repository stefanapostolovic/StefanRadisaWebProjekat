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
				<h3>{{facility.name}}</h3>
				
				<table>
				<tr>
					<th>Logo</th>
					<th>Name</th>
					<th>Type</th>
					<th>Location</th>
					<th>Rating</th>
					<th>Status</th>
				</tr>
				<tr>
					<td width="100%" height="100%"><img alt="fato" v-bind:src="facility.image" width="100px" height="100px"></td>
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
	
			<h3 style="margin-top:3cm; margin-bottom:1cm">Training list:</h3>
			<table>
				<tr>
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
				<tr v-for="(p, index) in trainings" @click="changeTraining(p)">
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
		    <h3 style="margin-top:2cm; margin-bottom:1cm;">Trainer list</h3>
		    <table>
		    	<tr>	
		    		<th>Ime</th>
		    		<th>Prezime</th>
		    		<th>Pol</th>
		    		<th>Datum rodjenja</th>
		    	</tr>
		    	<tr v-for="(p, index) in trainers">
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
		    <h3 style="margin-top:2cm; margin-bottom:1cm;">Customer list</h3>
		    <table>
		    	<tr>	
		    		<th>Ime</th>
		    		<th>Prezime</th>
		    		<th>Pol</th>
		    		<th>Datum rodjenja</th>
		    		<th>Poeni</th>
		    		<th>Tip kupca</th>
		    	</tr>
		    </table>
			    <p style="margin-top:2cm; margin-bottom:3cm;">
			    	<input type="button" value="Create new training" style="float:right;"
					@click="createTraining"/>
			    </p>
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









