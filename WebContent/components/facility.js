Vue.component("facility", { 
	data: function () {
	    return {
		  id: '',
		
	      facility: {"id":null, "name":null, "objectType":null, "status":null,
	      "location":{"longitude":null,"latitude":null,"address":{}}, 
	      "image":null, "averageRating":null, "startTime":null, "endTime":null},
	      
	      username:'',
	      password:'',
	      name:'',
	      surename:'',
	      gender:'',
	      dateOfBirth:'',	
	      
		  comments:[],
		  trainings:[],
		
		  loggedUser: null,
		  facilityManager: null,
		  validManagers: [],
		  
		  isManagerForm: false,
		  isCreateManager: false,
		  
		  //validacija
		  isFacilityManager: false,
		  isManagerUsername: false,
	      isManagerPass: false,
	      isManagerName: false,
	      isManagerSurname: false,
	      isManagerGender: false,
	      isManagerDate: false,
	      isManagerGender: false,
		  
		  returnFlag: -1
		}
	},
	    template: ` 
    	<div class="center">
			<h3 class="teal darken-2" style="margin-top:10%; margin-bottom:5%">{{facility.name}}</h3>
			<div class="row">
				<div id="tabela" class="col s9">
					<table>
						<tr class="tableRowBorder">
							<th>Logo</th>
							<th>Name</th>
							<th>Type</th>
							<th>Location</th>
							<th>Rating</th>
							<th>Status</th>
							<th></th>
						</tr>
						<tr class="tableRowBorder">
							<td><img alt="fato" v-bind:src="facility.image" 
							width="100px" height="100px"></td>
							<td class="kolona">
								<p style="width:150px;height=150px">
									{{facility.name}}
								</p>
							</td>
							<td class="kolona">
								<p style="width:150px;height=150px">
									{{facility.objectType}}
								</p>
								
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
							<td class="red-text">
								<span v-if="hasManager()">
								Missing manager</span>
							</td>
						</tr>
		    		</table>
				</div>
									<!-- GOOGLE MAPA -->
				<div class="col s3">
				
					<!-- Search input -->
					
					<input id="searchFacility" hidden
					class="controls white" type="text" 
					style="margin-top:10%"
					placeholder="Enter a location">
					
					<!-- Map -->
					
				    <div id="mapa" style="height: 300px; width: 100%; 
						 margin-left:40%">
		   			</div>
		   			
		   			<br></br>
					<span>
						<button @click="showMap" style="margin-left:50%"
						class="btn">Show Map</button>
						&nbsp;&nbsp;
					</span>
				</div>
				
			</div>
			    
								<!-- MANAGER -->
			<button v-if="hasManager()" class="btn" 
			@click.prevent="showManagerForm">
				Assign a manager
			</button>
			
			<form v-if="isManagerForm" style="margin-top:5%">
				<table>
					<tr>
						<td>Manager</td>
						<td>
							<span v-if="isFacilityManager" class="red-text">
								Please select a manager
							</span>
							
							<input type="button" v-if="this.validManagers.length == 0" 
							value="Register a new manager" class="btn"
							@click="registerNewManager"/>
							<select name="managers" id="managers" v-else v-model="facilityManager"
							style="display: block; background-color:#212121">
								<option v-for="(p, index) in validManagers"
								:value="p">
									{{p.name + ' ' + p.surename}}
								</option>
							</select>
						</td>
					</tr>
				</table>
				<p style="float:left">
					<button class="btn" v-if="this.validManagers.length != 0"
					@click="confirmCreate">Confirm</button>
				</p>
			</form>
										<!-- REGISTROVANJE NOVOG MENADZERA -->
			<form v-if="isCreateManager">
				<table>
					<tr>
						<td>Korisnicko ime:</td>
						<td>	
							<span v-if="isManagerUsername" class="red-text">
								Please enter the username
							</span>
							<input id="username" v-model = "username"  
							type = "text" name = "username">
						</td>
					</tr>
					<tr>
						<td>Lozinka:</td>
						<td>
							<span v-if="isManagerPass" class="red-text">
								Please enter the password
							</span>
							<input type="password" v-model = "password"  name="password">
					</td>
				
					</tr>
					<tr>
						<td>Ime:</td>
						<td>
							<span v-if="isManagerName" class="red-text">
								Please enter the name
							</span>
							<input id="ime" v-model = "name"  type = "text" name = "name">
					</td>	
					</tr>
					<tr>
						<td>Prezime:</td>
						<td>
							<span v-if="isManagerSurname" class="red-text">
								Please enter the surname
							</span>
							<input type="text" v-model = "surename"  name="surename">
					</td>
					</tr>
					<tr>
						<td>Pol:</td>
						<td>
							<span v-if="isManagerGender" class="red-text">
								Please enter the gender
							</span>
							<select name="pol" id="pol" v-model = "gender" 
							style="display: block; background-color: #212121;">
				 				  <option value="Male">Musko</option>
								  <option value="Female">Zensko</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>Datum rodjenja:</td>
						<td>
							<span v-if="isManagerDate" class="red-text">
								Please enter the date
							</span>
							<input type="date" id="rodjenje" name="rodjenje" 
							v-model = "dateOfBirth"/>
					</td>
					</tr>
					<tr>
						<td >
							<button  @click="confirmCreateWithNewManager" 
							class="btn">Poslaji</button>
							<input type="reset" value="Ponisti" class="btn">
							<td></td>
						</td>
					</tr>
				</table>
			</form>
			
			<h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%">
				Training schedule (same for every day):
			</h3>
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
					<th></th>
				</tr>
				<tr v-for="(p, index) in trainings" class="tableRowBorder"
				v-if="p.isDeleted == false">
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
					<td>
						<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
			    		  @click="deleteTrainingType(p)"
			    		  v-if="isAdmin()"
			    		  style="margin-right: 0; margin-left:auto; display:block;">
			    		  <i class="material-icons">cancel</i>
	    		  		</a>
					</td>
				</tr>
		    </table>
		    <h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%">
				Comments:
			</h3>    
			<table>
				<tr v-for="(p, index) in comments">
					<td class="kolona">
							{{p.text}}
					</td>
					<td class="kolona">
						{{p.grade}}
					</td>
					<td>
						<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
			    		  @click="deleteComment(p)"
			    		  v-if="isAdmin()"
			    		  style="margin-right: 0; margin-left:auto; display:block;">
			    		  <i class="material-icons">cancel</i>
	    		  		</a>
					</td>
				</tr>
		    </table>  
   		</div>  
    	`,
    mounted () {
		this.id = localStorage.getItem("selectedFacility");
		axios
			.get('rest/currentUser')
			.then(response => {
				this.loggedUser = response.data;
				return axios.get('rest/facilities/getFacility/' + this.id);
			})
			.then(response => {
				this.facility = response.data;
				return axios.get('rest/trainings/getTrainingsForSelectedFacility/' + this.id);
			})
			.then(response => {
				this.trainings = response.data;
				return axios.get('rest/getFacilityManager/' + this.id);
			})
			.then(response => {
				this.facilityManager = response.data;
				return axios.get('rest/getValidManagers');
			})
			.then(response => {
				this.validManagers = response.data;
			})
    },
    methods: {
		deleteComment(comment) {
			
		},
	
		showMap () {
			location.reload();
		},
		
		confirmCreateWithNewManager() {
			event.preventDefault();
			
			this.facilityManager = {username:null, password:null, name:"pedro", surename:null, gender:null, dateOfBirth:null,role:"Manager" };
			
			if (this.username === '') {
				this.isManagerUsername = true;
				this.returnFlag = 1;
			}
			else {
				this.isManagerUsername = false;
				this.facilityManager.username = this.username;
			}
			
			if (this.password === '') {
				this.isManagerPass = true;
				this.returnFlag = 1;
			}
			else {
				this.isManagerPass = false;
				this.facilityManager.password = this.password;
			}
			
			if (this.name === '') {
				this.isManagerName = true;
				this.returnFlag = 1;
			}
			else {
				this.isManagerName = false;
				this.facilityManager.name = this.name;
			}
			
			if (this.surename === '') {
				this.isManagerSurname = true;
				this.returnFlag = 1;
			}
			else {
				this.isManagerSurname = false;
				this.facilityManager.surename = this.surename;
			} 
			
			if (this.gender === '') {
				this.isManagerGender = true;
				this.returnFlag = 1;
			}
			else {
				this.isManagerGender = false;
				this.facilityManager.gender = this.gender;
			}
			
			if (this.dateOfBirth === '') {
				this.isManagerDate = true;
				this.returnFlag = 1;
			}
			else {
				this.isManagerDate = false;
				this.facilityManager.dateOfBirth = this.dateOfBirth;
			}
			
			this.facilityManager.sportFacility = this.facility;
			
			if (this.returnFlag == 1) {
				this.returnFlag = -1;
				return;
			}
			else this.returnFlag = -1; 
			
			axios
				.post('rest/register/', this.facilityManager)
				.then(response => {
					console.log(response);
					this.isManagerForm = false;
					this.isCreateManager = false;
					
					router.push('/facility');
				})
				.catch(reponse => {
					toast('User with that username already exists!');
				})
		},
	
		registerNewManager() {
			this.isCreateManager = !this.isCreateManager;
		},
		
		confirmCreate() {
			event.preventDefault();
			
			if (this.facilityManager.username == null || this.facilityManager.username === ''){
				this.isFacilityManager = true;
				this.canCreateFlag = 1;
			}
			else {
				this.isFacilityManager = false;
				this.facilityManager.sportFacility = this.facility;
			}
			console.log(this.facilityManager);
			
			if (this.canCreateFlag == 1) {
				this.canCreateFlag = -1;
				return;
			}
			else this.canCreateFlag = -1;
			
			axios
				.put('rest/updateUserKeepSession/' + this.facilityManager.username, this.facilityManager)
				.then(response => {
					console.log(response.data)
					console.log(this.facilityManager);
					this.isManagerForm = false;
					router.push('/facility');
				})
		},
		
		showManagerForm() {
			this.isManagerForm = !this.isManagerForm;
			this.isCreateManager = false;
		},
		
		hasManager() {
			if ((this.facilityManager == null || this.facilityManager === '') &&
			this.isAdmin())
				return true;
			return false;
		},
		
		isAdmin() {
			if (this.loggedUser == null)
				return false;
			return this.loggedUser.role === 'Administrator';
		},
	
		deleteTrainingType(training) {
			training.isDeleted = true;
			axios
				.put('rest/trainings/updateTraining', training)
				.then(response => {
					console.log(response.data);
					router.push('/facility');
				})
		},
		
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
