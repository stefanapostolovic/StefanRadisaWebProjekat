Vue.component("viewTraining", {
	data: function () {
		return {
			id: '',
			facilityId: '',
			name: '',
			type: '',
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
			isTrainingFile: false,
			
			canCreateFlag:  1
		}
	},
	
	template: `
		<div>
			<h1>Change training</h1>
			<form enctype="multipart/form-data">
					<table>
						<tr>
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
							<td>Duration</td>
							<td>
								<input type="number" v-model="training.duration">
							</td>
						</tr>
						<tr>
							<td>Trainer</td>
							<td>
								<select name="trainers" id="trainers" v-model="training.trainer">
									<option v-for="(p, index) in trainers"
									:value="p">
										{{p.name + ' ' + p.surename}}
									</option>
								</select>
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<input type="submit" @click.prevent="confirmUpdate"
								value="confirm">
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
				toast('That name is already taken!');
			}))
		},
		updateTraining() {
			return axios.put('rest/trainings/updateTraining', this.training);
		}
	}
});












