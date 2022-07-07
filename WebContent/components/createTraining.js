Vue.component("createTraining", {
	data: function() {
		return {
			loggedUser: null,
			facilityId: '',
			
			newTraining: {},
			facility: {},
			name: '',
			type: '',
			description: '',
			duration: '',
			
			file: null,
			
			trainer: {},
			trainers: [],	
			
			formData: null,
			
			//validation
			isTrainingName: false,
			isTrainingType: false,
			isTrainingFile: false,
			isTrainer: false,
			
			canCreateFlag:  1
		}
	},
		template:`
			<div class="container">
				<h1 style="margin-top:7%; margin-bottom:7%">Create a new training</h1>
				<p style="margin-top:5%; margin-bottom:5%; color: #00bfa5;">
					To add a personal or group training, in the field "Type" type
					 <b>"personal" </b>or<b>" group"</b> .
				</p>
				<form enctype="multipart/form-data">
					<table>
						<tr>
							<td>Icon</td>
							<td>
								<span v-if="isTrainingFile" class="red-text">
									Please upload a file
								</span>
								<input type="file" name="file" @change="onFileSelected"/>
							</td>
						</tr>
						<tr>
							<td>Name</td>
							<td>
								<span v-if="isTrainingName" class="red-text">
									Please enter the name
								</span>
								<input type="text" v-model="name">
							</td>
						</tr>
						<tr>
							<td>Type</td>
							<td>
								<span v-if="isTrainingType" class="red-text">
									Please enter the type
								</span>
								<input type="text" v-model="type">
							</td>
						</tr>
						<tr>
							<td>Description</td>
							<td>
								<input type="text" v-model="description">
							</td>
						</tr>
						<tr>
							<td>Duration (hours)</td>
							<td><input type="number" v-model="duration"></td>
						</tr>
						<tr>
							<td>Trainer</td>
							<td>
								<span v-if="isTrainer" class="red-text">
									Please select a trainer
								</span>
								<select name="trainers" id="trainers" v-model="trainer"
								:disabled="isPersonalOrGroup()"
								class="displaySelect grey darken-4">
									<option v-for="(p, index) in trainers"
									v-if="p.isDeleted == false"
									:value="p">
										{{p.name + ' ' + p.surename}}
									</option>
								</select>				
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<button class="btn" @click.prevent="confirmCreate">
									Confirm
								</button>
								<td></td>
							</td>
						</tr>
					</table>
				</form>
			</div>
		`,
		
	mounted() {
		this.facilityId = localStorage.getItem("selectedFacility");
		this.isTrainer = false;
		
		axios.all([
			this.getAllTrainers(),
			this.getLoggedUser(),
			this.getSelectedFacility()
		])
		.then(axios.spread((first_response, second_response, third_response) => {
			this.trainers = first_response.data;
			this.loggedUser = second_response.data;
			this.facility = third_response.data;
		}))
	},
	
	methods: {
		isPersonalOrGroup() {
			if (this.type === 'personal' || this.type === 'group') {
				return false;
			}
			
			return true;
			//return this.type !== 'personal' || 	this.type !== 'group';
		},
		
		getSelectedFacility() {
			return axios.get('rest/facilities/getFacility/' + this.facilityId);
		},
		
		onFileSelected(event) {
			this.file = event.target.files[0];
			this.formData = new FormData();
			this.formData.append("file", this.file);
		},
		
		uploadFile() {
			return axios({
				url:'rest/trainings/uploadFile',
				data:this.formData,
				method:'POST',
				headers:{
					Accept:'application/json',
					'content-type':'multipart/form-data'
				},
				
			})
		},
		
		getLoggedUser() {
			return axios.get('rest/currentUser')
		},
		
		getAllTrainers() {
			return axios.get('rest/getTrainers')
		},
		
		confirmCreate() {
			if (this.name === '') {
				this.isTrainingName = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isTrainingName = false;
				this.newTraining.name = this.name;
			}
			
			if (this.type === '') {
				this.isTrainingType = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isTrainingType = false;
				this.newTraining.trainingType = this.type;
			}
			
			if (this.file == null) {
				this.isTrainingFile = true;
				this.canCreateFlag = -1;	
			}
			else {
				this.isTrainingFile = false;
			}
			
			if (this.trainer.username == null || this.trainer.username === '') {
				if (this.isPersonalOrGroup() == false) {
					this.isTrainer = true;
					this.canCreateFlag = -1;
				}
			}
			else {
				this.isTrainer = false;
			}
			
			this.newTraining.sportFacility = this.facility;
			this.newTraining.duration = this.duration;
			this.newTraining.trainer = this.trainer;
			this.newTraining.description = this.description;
			
			if (this.canCreateFlag == -1) {
				this.canCreateFlag = 1;
				return;
			}
			else this.canCreateFlag = 1; 
			
			axios.all([
				this.createTraining(),
				this.uploadFile()
			])
			.then(axios.spread((first_response) => {
				router.push('/managerInfo');
			}))
			.catch(axios.spread((first_response) => {
				toast('That name is already taken!');
			}))
		},
		
		createTraining() {
			return axios.post('rest/trainings/createTraining', this.newTraining);
		}
	}
});