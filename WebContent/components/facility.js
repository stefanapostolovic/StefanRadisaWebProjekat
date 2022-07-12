Vue.component("facility", { 
	data: function () {
	    return {

		  id: '',
		
	      facility: {"id":null, "name":null, "objectType":null, "status":null,
	      "location":{"longitude":null,"latitude":null,"address":{}}, 
	      "image":null, "averageRating":null, "startTime":null, "endTime":null},
          history:{"id":null,"time":null,"applicationDateTime":null,"training":null,"user":null,"coach":null,"isDeleted":false},
	
	      username:'',
	      password:'',
	      name:'',
	      surename:'',
	      gender:'',
	      dateOfBirth:'',	
	      

	      comment:{"id":0,"active":true,"isDeleted":false,"state":"New","sportFacility":{"id":null,"name":null,"objectType":null,"status":true,"location":{"id":null,"longitude":null,"latitude":null,"address":{"street":null,"number":null,"city":null,"zipCode":null}},"image":null,"averageRating":null,"startTime":null,"endTime":null},"text":"","grade":0,"user":{"username":null,"password":null,"name":null,"surename":null,"gender":null,"dateOfBirth":null,"role":null,"trainingHistory":null,"membership":null,"sportFacility":null,"visitedFacilities":null,"points":1.0,"customerType":{"name":null,"discount":0.0,"points":0.0}}},
		  acceptedRejected:[],
		  comments:[],
		  newComment:[],
		  trainings:[],
		
		  loggedUser: null,
		  facilityManager: null,
		  validManagers: [],
		  
		  isManagerForm: false,
		  isCreateManager: false,
		  clanarina:false,
		  poruka1:"",
		  //validacija
		  isFacilityManager: false,
		  isManagerUsername: false,
	      isManagerPass: false,
	      isManagerName: false,
	      isManagerSurname: false,
	      isManagerGender: false,
	      isManagerDate: false,
	      isManagerGender: false,
		  posetio:true,		  

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
				<span v-if="clanarina" class="red-text">
								{{poruka1}}
				</span>
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
						<button v-on:click="sentToChild(p)">Prijava</button>
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














			<h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%" name="noviKomentari">Novi Komentari:</h3> 
		<table name="tabelaNovi">
					<tr class="tableRowBorder">
						<th>Komentar</th>
					<th>Ocena</th>
				</tr>
				<tr class="tableRowBorder" v-for="(p, index) in newComment" v-if="p.isDeleted == false">
					<td class="kolona">
							{{p.text}}
					</td>
					<td class="kolona">
						{{p.grade}}
					</td>
					<td><button v-on:click="Odobri(p,index)">Odobri</button> </td>
					<td><button v-on:click="Odbi(p,index)">Odbi</button> </td>
				</tr>
	    	</table>
		<h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%">Komentari:</h3> 
		<table name="coment" hidden>
				<tr class="tableRowBorder">
							<th>Komentar</th>
					<th>Ocena</th>
				</tr>
				<tr class="tableRowBorder" v-for="(p, index) in comments" v-if="p.isDeleted == false">
					<td class="kolona">
							{{p.text}}
					</td>
					<td class="kolona">
						{{p.grade}}
					</td>
					<td id="state" name="state" >{{status(p.state)}}</td>
				</tr>
	    	</table>
		<table name="coment1" hidden>
					<tr class="tableRowBorder">
						<th>Komentar</th>
					<th>Ocena</th>
				</tr>
				<tr class="tableRowBorder" v-for="(p, index) in comments" v-if="p.isDeleted == false">
					<td class="kolona">
							{{p.text}}
					</td>
					<td class="kolona">
						{{p.grade}}
					</td>
				</tr>
	    	</table>
		<h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%" name="naslov" hidden>Dodaj komentar:</h3> 
		<form name="komentar" hidden>
		<table >
		
			<tr class="tableRowBorder">
					<th>Komentar:</th>
		<th>Ocjena:</th>
		</tr>
				<tr class="tableRowBorder">
							<td class="kolona">
						<textarea v-model="comment.text" width="100%"></textarea>
					</td>
					<td>
					<input type="number" id="age1" name="ocena" min="1" max="5">
					</td>
				</tr>
					<tr class="tableRowBorder">
					<input type="submit" v-on:click="addCommentFunkcija" value="Dodaj komentar">
				</tr>
	    	</table>
	</form>			
	
   		</div>  
    	`,
    mounted () {
		this.id = localStorage.getItem("selectedFacility");

		/*axios.all([
			this.getLoggedUser(),
			this.getSelectedFacility(),
			this.getAllTrainingsForCurrentFacility()
		])
		.then(axios.spread((first_response, second_response, third_response) => {
			this.loggedUser = first_response.data;
			this.facility = second_response.data;
			this.trainings = third_response.data;
		}))*/
			
			let date = new Date();

			let day = ("0" + date.getDate()).slice(-2);
			let month = ("0" + (date.getMonth() + 1)).slice(-2);

			let today = date.getFullYear() + "-" + (month) + "-" + (day);
			let hours = ("0" + date.getHours()).slice(-2);
			let minutes = ("0" + (date.getMinutes() + 1)).slice(-2);

			this.history.time = (hours) + ":" + (minutes)
			this.history.applicationDateTime=today

		axios
			.get('rest/currentUser')
			.then(response => {
				this.loggedUser = response.data;
				return axios.get('rest/facilities/getFacility/' + this.id);
			})
			.then(response => {
				this.facility = response.data;
				this.comment.sportFacility = this.facility;
								
				return axios.get('rest/trainings/getTrainingsForSelectedFacility/' + this.id);
			})
			.then(response => {
				this.trainings = response.data;
				return axios.get('rest/newTraining/getFacility/'+this.facility.id+'/'+this.loggedUser.username)
			}).then(response => {
				if(response.data=="" || response.data ==null)
					this.posetio=true;
				else
					this.posetio=false;
									
				return 	axios.get('rest/comment/acceptedAndRejected/'+this.id);		
			}).then(response=>{	
				this.acceptedRejected = response.data;
				console.log(this.acceptedRejected)
				
				return axios.get('rest/comment/odobreni/'+this.id);
			}).then(response=>{	
				this.comments =response.data;
				console.log(this.comments)
			
			}).then(response=>{	
				
				return axios.get('rest/comment/novi/'+this.id);
			}).then(response=>{	
				this.newComment = response.data;
				console.log(this.newComment)
				let p = document.getElementsByName("naslov")[0]
				let p1= document.getElementsByName("komentar")[0]
				let p2 = document.getElementsByName("noviKomentari")[0]
				let p3= document.getElementsByName("tabelaNovi")[0]
				let n = document.getElementsByName("coment")[0]
				let n1 = document.getElementsByName("coment1")[0]
				n.hidden = true;
				n1.hidden= false;
				p.hidden=this.posetio;	
				p1.hidden=this.posetio;		
				p2.hidden=true;
				p3.hidden=true;
	
				if(this.loggedUser!=""){	
					if(this.loggedUser.role =="Administrator" || this.loggedUser.role=="Manager"){
						this.comments = this.acceptedRejected;
						
						n.hidden=false;
						n1.hidden= true;		
						if(this.newComment.length > 0){
							p2.hidden=false;
							p3.hidden=false;
						}
					}
				}
				else{
						n1.hidden=false;
						p.hidden=this.posetio;
						p1.hidden=this.posetio;
						this.comment.user=this.loggedUser;
						p2.hidden=true;
						p3.hidden=true;	
				}
				
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
		sentToChild:function(p){
			if(this.loggedUser.role == "Customer"){
			localStorage.setItem("selectedTraining", p.id)
			router.push(`/scheduledTraining`);
			}
		},
		prijava:function(p){
			this.history.user = this.loggedUser
			this.history.training = p; 
			this.history.coach = p.trainer;
			
			if(this.loggedUser==null || this.loggedUser==""){
				this.clanarina =true;	
				this.poruka1 = "Morate se ulogovati"
				return;
				
			}
			
			if(this.loggedUser.membership == null)	
			{
				this.clanarina =true;	//ako je korisnik nema
				this.poruka1 = "Nemate clanarinu"
				return;
			}else if(this.loggedUser.membership.status==false ||  parseInt(this.loggedUser.membership.counter)<=0){
				this.clanarina =true; //ako je istekla
				this.poruka1 = "Clanarina je istrkla"
				return;
			}
			let pomD = new Date();
			let datum1 = new Date(this.loggedUser.membership.expirationDate)
			if(pomD.getTime()>datum1.getTime()){
				this.clanarina=true;
				this.poruka1 = "Clanarina je istrkla"
				return;	
			}
			axios.all([
			this.getNumberTraining(),
			this.addHistory(),
			]).then(axios.spread((response1, response2) => {
				if(response1.data !=null || response1.data!=""){
					if(this.loggedUser.membership.numberAppointments != null || this.loggedUser.membership.numberAppointments!=""){
						if(parseInt(response1.data)>=parseInt(this.loggedUser.membership.numberAppointments)){
							this.clanarina=true;
					
							this.poruka1 = "Prekoracen dnevni broj poseta"
							return;
						}
					}	
				}
					router.push(`/`)
					this.loggedUser.membership.counter = parseInt(this.loggedUser.membership.counter) - 1;
					return axios.put('rest/updateUser/' + this.loggedUser.username,this.loggedUser);
					
				}))
		},getNumberTraining(){
			return axios.put('rest/newTraining/numberInOneDay',this.loggedUser)
		},
		addHistory(){
			return axios.post('rest/newTraining/addTraining', this.history)
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
		addCommentFunkcija:function(){
			event.preventDefault();
			let n = document.getElementsByName("naslov")[0]
			let n1= document.getElementsByName("komentar")[0]
			n.hidden=true;
			n1.hidden=true;		
			let values = document.getElementsByName("ocena")[0];
			
			//for(let i = 0; i < values.length; i++) {
	   		//	if(values[i].checked == true) {
	       	this.comment.grade = values.value;
		console.log(this.comment)
   			//}
			//}

		axios
		.post('rest/comment/dodavanje',this.comment)
		.then(response=>{})
		.catch(response=>{toast("Vec postoji komentar koji je dodat")})
	},
		
		Odobri : function(p,index) {
			p.state="Accepted"
			
				axios
	            .put('rest/comment/update/'+p.id, p)
	            .then(response => {this.newComment.splice(index, 1);
					this.comments.push(response.data);
					return axios.get('rest/comment/ocena/'+this.facility.id);	
				}).then(response=>{
					this.facility.averageRating = response.data;
					return axios.put('rest/facilities/updateFacility',this.facility);
				}).then(response=>{
					this.facility= response.data;
					
				})
    	},
		Odbi : function(p,index) {
			p.state="Rejected"
				axios
	            .put('rest/comment/update/'+p.id, p)
	            .then(response => {this.newComment.splice(index, 1);
					this.comments.push(response.data);
					}).catch(response => {
					toast('')
	
						})
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
    	},status : function(p) {
    		if (p == "Accepted"){
	    		return "Odobren";
    		}
    		else
				return "Odbijen";
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
