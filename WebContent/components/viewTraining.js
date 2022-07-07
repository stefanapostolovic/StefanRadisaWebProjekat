Vue.component("viewTraining", {
	data: function () {
		return {
			id: '',
			facilityId: '',
			name: '',
			type: '',
			time: '',
			description: '',
			duration: '',
			
			trainer: {},
			trainers:[],
			training: {},
			facility: {},
			loggedUser: {},
			
			file: null,
			formData: null,
			
			//validation
			isTrainingName: false,
			isTrainingType: false,
			isTrainingTime: false,
			isTrainingFile: false,
			isFacilityOpen: false,
			
			canCreateFlag:  1
		}
	},
	
	template: `
		<div class="container">
			<h1 style="margin-top:7%; margin-bottom:7%">Change training</h1>
			<p style="margin-top:5%; margin-bottom:5%; color: #00bfa5;">
				To add a personal or group training, in the field "Type" type
				 <b>"personal" </b>or<b>" group"</b> .
			</p>
			<form enctype="multipart/form-data">
					<table>
						<tr class="tableRowBorderBoth">
							<td>
								<img alt="fato" v-bind:src="training.image" width="100px" height="100px">
							</td>
							<td>
								<input type="file" name="file" @change="onFileSelected"
								:class="{ invalidField : isTrainingFile}"/>
							</td>
						</tr>
						<tr>
							<td>Name</td>
							<td>
								<input type="text" v-model="training.name"
								:class="{ invalidField : isTrainingName}">
							</td>
						</tr>
						<tr>
							<td>Type</td>
							<td>
								<input type="text" v-model="training.trainingType"
								:class="{ invalidField : isTrainingType}">
							</td>
						</tr>
						<tr>
							<td>Description</td>
							<td>
								<input type="text" v-model="training.description">
							</td>
						</tr>
						
						<tr>
							<td>Training time</td>
							<td>
								<span v-if="isTrainingTime" class="red-text">
									Please enter the time
								</span>
								<span v-if="isFacilityOpen" class="red-text">
									Facility is not open at that time
								</span>
								<input type="time" min="06:00" max="22:00" 
								:disabled="training.trainingType === 'personal'" 
								v-model="training.trainingTime">
							</td>
						</tr>
						
						<tr>
							<td>Duration</td>
							<td>
								<input type="number" v-model="training.duration">
							</td>
						</tr>
						<tr>
							<td>Trainer</td>
							<td>
								<select name="trainers" id="trainers"
								:disabled="isPersonalOrGroup()" 
								v-model="training.trainer"
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
								<button class="btn" @click.prevent="confirmUpdate">
									Confirm
								</button>
								<input type="reset" value="Reset" class="btn">
								<td></td>
							</td>
						</tr>
					</table>
				</form>
		</div>
	`,
	
    mounted () {
		/*this.$root.$on('trainingFromParent', (selectedTraining) => {
			this.training = selectedTraining;
		});*/

		//this.training = this.$root.SendSelectedTraining();
		this.id = localStorage.getItem("selectedTraining");
		this.facilityId = localStorage.getItem("selectedFacility");	
		
		axios.all([
			this.getAllTrainers(),
			this.getSelectedTraining(),
			this.getSelectedFacility(),
			this.getLoggedUser()
		])
		.then(axios.spread((first_response, second_response, third_response, fourth_response) => {
			this.trainers = first_response.data;
			this.training = second_response.data;
			this.facility = third_response.data;
			this.loggedUser = fourth_response.data;
		}))	
    },
    
	methods: {
		isPersonalOrGroup() {
			if (this.training.trainingType === 'personal' || this.training.trainingType === 'group') {
				return false;
			}
			
			return true;
			//return this.type !== 'personal' || 	this.type !== 'group';
		},
		
		getLoggedUser() {
			return axios.get('rest/currentUser')
		},
		
		isCorrectManager() {
			if (this.loggedUser.role !== 'Manager') return true;
			else return this.loggedUser.sportFacility.name !== this.facility.name;
		},
		
		getSelectedFacility() {
			return axios.get('rest/facilities/getFacility/' + this.facilityId);
		},
		
		getSelectedTraining() {
			return axios.get('rest/trainings/getTraining/' + this.id);
		},
		
		getAllTrainers() {
			return axios.get('rest/getTrainers')
		},
		
		onFileSelected(event) {
			this.file = event.target.files[0];
			this.formData = new FormData();
			this.formData.append("file", this.file);
		},
		uploadFile() {
			return axios({
				url:'rest/trainings/updateFile/' + this.id,
				data:this.formData,
				method:'POST',
				headers:{
					Accept:'application/json',
					'content-type':'multipart/form-data'
				},
				
			})
		},
		confirmUpdate() {
			if (this.training.name === '') {
				this.isTrainingName = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isTrainingName = false;
			}
			
			if (this.training.type === '') {
				this.isTrainingType = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isTrainingType = false;
			}
			
			//DODAO
			if (this.training.trainingType !== 'personal' && this.training.trainingTime === '') {
				this.isTrainingTime = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isTrainingTime = false;
			}
			
			if (this.training.trainingType == 'personal')
				this.training.trainingTime = '';
			else {
				let trHours = parseInt(this.training.trainingTime.split(':')[0]);
				let facStart = parseInt(this.facility.startTime.split(':')[0]);
				let facEnd = parseInt(this.facility.endTime.split(':')[0]);
				
				if (trHours < facStart || trHours > facEnd) {
				this.isFacilityOpen = true;
				this.canCreateFlag = -1;
				}
				else {
					this.isFacilityOpen = false;
				}
			}
			//DODAO
			
			if (this.file == null) {
				this.isTrainingFile = true;
				this.canCreateFlag = -1;	
			}
			else {
				this.isTrainingFile = false;
			}
			
			if (this.canCreateFlag == -1) {
				this.canCreateFlag = 1;
				return;
			}
			else this.canCreateFlag = 1; 
			
			axios.all([
				this.updateTraining(),
				this.uploadFile()
			])
			.then(axios.spread((first_response) => {
				router.push('/managerInfo');
			}))
			.catch(axios.spread((first_response) => {
				toast('That name is already taken or the trainer is not available at that time!');
			}))
		},
		updateTraining() {
			return axios.put('rest/trainings/updateTraining', this.training);
		}
	}
});












