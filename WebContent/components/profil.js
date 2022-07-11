Vue.component("profil", {
		data: function () {
		    return {
		      id : -1,
			  users:{},
			  user: {id: -1, username:null, password:null, name:null, surename:null, gender:null, dateOfBirth:null },
			  history:[],
		      username:'',
		      password:'',
		      name:'',
		      surename:'',
		      gender:'',
		      dateOfBirth:'',
		      
		      //search
			srchFacName: '',
			srchFrom: '',
			srchTo: '',
			srchDateStart: '',
			srchDateEnd: '',
			
			//filtriranje
			searchFacilityType: '',
			searchTrainingType: '',
			
			//sortiranje
			sortDirectionFacName: 'ASC',
			sortDirectionPrice: 'ASC',
			sortDirectionDate: 'ASC'
		    }
	},
	template: ` 
		<div class="container ">
			<header></header>
			<h1 style="margin-bottom:10%; margin-top:5%">Profile</h1>
			<form>
				<table>
					
				<tr style=" border-bottom: thin solid; border-top: thin solid;">
					<td>Username:</td>
					<td><input  id="username" v-model = "user.username" class="white-text" disabled
					type = "text" name = "username">
					</td>
				</tr>
				<tr>
					<td>Password:</td>
						<td><input type="password" v-model = "user.password"  name="password"></td>
			
				</tr>
				<tr>
					<td>Name:</td>
					<td><input id="ime" v-model = "user.name"  type = "text" name = "name"></td>	
				</tr>
				<tr>
					<td>Surname:</td>
					<td><input type="text" v-model = "user.surename"  name="surename"></td>
				</tr>
				<tr>
					<td>Gender:</td>
					<td><select name="pol" id="pol" v-model = "user.gender" 
						class="displaySelect grey darken-4">
			 				  <option value="Male">Musko</option>
							  <option value="Female">Zensko</option>
						</select></td>
				</tr>
				<tr>
					<td>Date of birth:</td>
					<td><input type="date" id="rodjenje" name="rodjenje" v-model="user.dateOfBirth"/></td>
				</tr>
				<tr>
					<td >
						<button class="btn" @click="edituser">
							Confirm
				    	</button>
					</td>
					<td></td>
				</tr>	
				</table>
			</form>
			
			
			<label hidden name="lab">A user with that username already exists.</label>
		
			<br>
			<br>
			<br>
			
			
			<h3 class="teal darken-2" style="margin-bottom:5%; text-align:center">
							Scheduled trainings
			</h3>
			
			<div style="margin-top:7%;">
				<div class="row">
				
					<div class="col s3">
						<div class="card teal darken-2">
					        <div class="card-content white-text">
					          <span class="card-title">Search</span>
					          <p>
								<input type="text" v-model="srchFacName" placeholder="search by facility name"
								class="white-text"/>
					          </p>
					          <p>
								<input type="text" v-model="srchFrom" placeholder="search by starting price"
								class="white-text"/>
					          </p>
					          <p>
								<input type="text" v-model="srchTo" placeholder="search by end price"
								class="white-text"/>
					          </p>
					          <p>
								<input type="date" v-model="srchDateStart" placeholder="search by start date"
								class="white-text"/>
					          </p>
					          <p>
								<input type="date" v-model="srchDateEnd" placeholder="search by end date"
								class="white-text"/>
					          </p>
					        </div>
					        <div class="card-action">
					          <a @click="multiSearch">search</a>
					        </div>
				      </div>
					</div>
					
					<div class="col s9" style="text-align: center;">
						<table style="margin-bottom:10%">
							
							<tr style=" border-bottom: thin solid;">
								<th></th>
									
								<td>
									<input type="text" v-model="searchTrainingType" placeholder="filter type"/>
								</td>
								
								<td>
									<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
		  							@click="changeSort('FacilityName')">
		  							<i class="material-icons">arrow_drop_down</i>
		  							</a>
								</td>
								<td>
									<input type="text" v-model="searchFacilityType" placeholder="filter type"/>
								</td>
								<td>
									<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
			  						@click="changeSort('Date')">
			  							<i class="material-icons">arrow_drop_down</i>
			  						</a>
								</td>
							</tr>
							
							<tr class="tableRowBorder">
								<th>Training name</th>
								<th>Training type</th>
								<th>Facility name</th>
								<th>Facility type</th>
								<th>Training date</th>
							</tr>
							
							<tr v-for="(p, index) in filteredTrainingHistories" class="tableRowBorder"
							v-if="p.isDeleted == false"
							:style="{background: p.isCanceled == true ? '#4a148c' : '#212121'}">
								<td>
									{{p.training.name}}
								</td>
								<td>
									{{p.training.trainingType}}
								</td>
								<td>
									<p clas="tableRow">
										{{p.training.sportFacility.name}}
									</p>
								</td>
								<td>
									<p clas="tableRow">
										{{p.training.sportFacility.objectType}}
									</p>
								</td>
								<td>
									<p clas="tableRow">
										{{p.applicationDateTime}}
									</p>
								</td>
								
							</tr>
						</table>
					</div>
					
				</div>
			</div>
	
		</div>		  
`
	, 
	methods : {
		edituser : function () {
			event.preventDefault();
			
			let username = document.getElementsByName("username")[0]
			let sifra = document.getElementsByName("password")[0]
			let ime = document.getElementsByName("name")[0]
			let prezime = document.getElementsByName("surename")[0]
			let pol = document.getElementsByName("pol")[0]
			let rod = document.getElementsByName("rodjenje")[0]
			let l = document.getElementsByName("lab")[0]
			username.style.background = "white"
			sifra.style.background ="white"
			ime.style.background ="white"
			prezime.style.background ="white"
			pol.style.background="white"
			rod.style.background ="white"
			l.hidden=true;
			
			if(this.user.username ==="")
			{
			username.style.background = "red"
			sifra.style.background ="white"
			ime.style.background ="white"
			prezime.style.background ="white"
			pol.style.background="white"
			rod.style.background ="white"
			
				return;
			}else if(this.user.password ===""){	
				sifra.style.background = "red"
			ime.style.background ="white"
			prezime.style.background ="white"
			pol.style.background="white"
			rod.style.background ="white"
				return;
			}else if(this.user.name===""){
				ime.style.background = "red"
			prezime.style.background ="white"
			pol.style.background="white"
			rod.style.background ="white"
				return;
			}else if(this.user.surename===""){
				prezime.style.background = "red"
			pol.style.background="white"
			rod.style.background ="white"
		
				return;
			}else if(this.user.gender===""){
				pol.style.background = "red"
			rod.style.background ="white"
				return;
			}else if(this.user.dateOfBirth===""){
				rod.style.background = "red"
				return;
			}
			
			rod.style.background ="white"
			console.log(this.username);
			
			axios.put('rest/updateUser/' + this.user.username, this.user).
				then(response => {
					this.user = response.data;
					router.push(`/`);
				});		

			l.hidden=true;
		},
		
		changeSort(columnName) {
			
			switch(columnName) {
				case ('FacilityName'): {
					let copiedUpcomingTrainings = Object.assign([], this.history);
					copiedUpcomingTrainings.sort((a, b) => {
						let fa = a.training.sportFacility.name.toLowerCase();
						let fb = b.training.sportFacility.name.toLowerCase();
						
						if (this.sortDirectionFacName === 'ASC') {
							if (fa < fb) {
    								return -1;
							}
						    if (fa > fb) {
						        return 1;
						    }
						    return 0;
						}
						else {
							if (fa < fb) {
								return 1;
							}
					    	if (fa > fb) {
					        	return -1;
					    	}
					    	return 0;
						}
					})
					
					if (this.sortDirectionFacName === 'ASC') {
						this.sortDirectionFacName = 'DESC';
						this.sortDirectionPrice = 'DESC';
						this.sortDirectionDate = 'DESC';
					}
					else {
						this.sortDirectionFacName = 'ASC';
						this.sortDirectionPrice = 'ASC';
						this.sortDirectionDate = 'ASC';
					}
					
					this.history = copiedUpcomingTrainings;
				}
				break;
				case ('Date'): {
					let copiedUpcomingTrainings = Object.assign([], this.history);
					
					copiedUpcomingTrainings.sort((a, b) => {
						let fa = a.applicationDateTime;
						let fb = b.applicationDateTime;
						
						if (this.sortDirectionDate === 'ASC') {
							if (fa < fb) {
    								return -1;
							}
						    if (fa > fb) {
						        return 1;
						    }
						    return 0;
						}
						else {
							if (fa < fb) {
								return 1;
							}
					    	if (fa > fb) {
					        	return -1;
					    	}
					    	return 0;
						}
					})
					
					if (this.sortDirectionDate === 'ASC') {
						this.sortDirectionFacName = 'DESC';
						this.sortDirectionPrice = 'DESC';
						this.sortDirectionDate = 'DESC';
					}
					else {
						this.sortDirectionFacName = 'ASC';
						this.sortDirectionPrice = 'ASC';
						this.sortDirectionDate = 'ASC';
					}
					
					this.history = copiedUpcomingTrainings;
				}
				break;
			}
		},
		
		multiSearch () {
			axios
				.get('rest/newTraining/search/' + this.srchFacName + '/' +
				this.srchFrom + '/' + this.srchTo + '/' + this.srchDateStart + '/' + this.srchDateEnd)
				.then(response => {
					this.history = response.data;
				})
		}
		
	},
	
	mounted () {
		axios.get('rest/currentUser').
				then(response => {this.user =  response.data;console.log(this.user);
				return axios.get('rest/newTraining/allForCustomer/'+this.user.username)
				}).then(response=>(this.history = response.data))
						
	},
	
	computed: {
			filteredTrainingHistories: function() {
				return this.history.filter((p) => {
					if (this.searchFacilityType === '' && this.searchTrainingType == '')
						return true;
					else if (p.training.sportFacility.objectType.toLowerCase().match(this.searchFacilityType)
					&& this.searchTrainingType === '') {
						return true;
					}
					else if (this.searchFacilityType === '' && 
					p.training.trainingType.toLowerCase().match(this.searchTrainingType)) {
						return true;
					}
					else if (p.training.sportFacility.objectType.toLowerCase().match(this.searchFacilityType) &&
					p.training.trainingType.toLowerCase().match(this.searchTrainingType))
						return true;
						
					else
						return false; 
				})
			}
		}
});





