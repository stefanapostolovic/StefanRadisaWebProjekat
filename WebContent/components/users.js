Vue.component("users", { 
	data: function () {
	    return {
	      users: [],
	      srchname: '',
	      srchsurname: '',
	      srchusername: '',
	      
	      filterrole: '',
	      filtercustomertype: '',
	      
	      sortDirectionName: 'ASC',
	      sortDirectionSurname: 'ASC',
	      sortDirectionUsername: 'ASC',
	      sortDirectionPoints: 'ASC',
	    }
	},
	    template: ` 
    	<div class="row" width=100%>
    		<h1 style="margin-top:4%">Prikaz korisnika</h1>
    		
    						<!--SEARCH-->
    		
    		<div class="col s3" style="margin-top:7%; margin-left:4%">
				<div class="row">
				    <div class="col s12 m6">
				      <div class="card teal darken-2">
				        <div class="card-content white-text">
				          <span class="card-title">Search</span>
				          <p>
							<input type="text" v-model="srchname" placeholder="search by name"
							class="white-text"/>
				          </p>
				          <p>
							<input type="text" v-model="srchsurname" placeholder="search by surname"
							class="white-text"/>
				          </p>
				          <p>
							<input type="text" v-model="srchusername" placeholder="search by username"
							class="white-text"/>
				          </p>
				        </div>
				        <div class="card-action">
				          <a @click="multiSearch">search</a>
				        </div>
				      </div>
				    </div>
		  		</div>
    		</div>
    		
    		<div class="col s6" style="text-align: center; margin-top:3%;">
    		
    			<table border="1">				<!--SORT && FILTER-->
    			<tr class="tableRowBorder">
    				<td>
    					<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
	  						@click="changeSort('Name')">
	  						<i class="material-icons">arrow_drop_down</i>
	  					</a>
    				</td>
    				<td>
    					<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
	  						@click="changeSort('Surname')">
	  						<i class="material-icons">arrow_drop_down</i>
	  					</a>
    				</td>
    				<td>
    					<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
	  						@click="changeSort('Username')">
	  						<i class="material-icons">arrow_drop_down</i>
	  					</a>
    				</td>
    				<td></td>
    				<td>
    					<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
	  						@click="changeSort('Points')">
	  						<i class="material-icons">arrow_drop_down</i>
	  					</a>
    				</td>
    				<td>
    					<input type="text" v-model="filterrole" placeholder=
    					"filter role"/>
    				</td>
    				<td>
    					<input type="text" v-model="filtercustomertype" placeholder=
    					"filter customer type"/>
    				</td>
    			</tr>
	    		<tr class="tableRowBorder">
	    			<th>Name</th>
	    			<th>Surname</th>
					<th>Username</th>	
					<th>Gender</th>
					<th>Points</th>
					<th>Role</th>
					<th>Customer type</th>
					<th></th>
				</tr>
	    			
	    		<tr v-for="(p, index) in filteredUsers"
	    		v-if="p.isDeleted == false" 
	    		class="tableRowBorder">
	    			<td>
	    				<p style="width:150px;height=150px">
	    					{{p.name}}
	    				</p>
	    			</td>
	    			<td>
	    				<p style="width:150px;height=150px">
	    					{{p.surename}}
	    				</p>
	    			</td>
					<td>
						<p style="width:150px;height=150px">
							{{p.username}}
						</p>
					</td>
					<td>
						<p style="width:150px;height=150px">
							{{p.gender}}
						</p>
					</td>
					<td>
						<p style="width:150px;height=150px">
							{{p.points}}
						</p>
					</td>
					<td>
						<p style="width:150px;height=150px">
							{{p.role}}
						</p>
					</td>
					<td>
						<p style="width:150px;height=150px">
							{{p.customerType.name}}
						</p>
					</td>
					<td>	
						<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
			    		  @click="deleteUser(p)"
			    		  style="margin-right: 0; margin-left:auto; display:block;">
			    		  <i class="material-icons">cancel</i>
		    		  	</a>
					</td>
				</tr>
	    	</table>
    		</div>
   	</div>		  
    	`,
    mounted () {
        axios
          .get('rest/svi')
          .then(response => (this.users = response.data))
    },
    methods: {
		deleteUser(user) {
			user.isDeleted = true;
			
			if (user.role === 'Customer') {
				if (user.membership != null)
					user.membership.isDeleted = true;
				
				axios
					.get('rest/newTraining/allForCustomer/' + user.username)
					.then(response => {
						let customerTrainingHistory = response.data;
						customerTrainingHistory.forEach(this.deleteTrainingHistory);
						
						return axios.put('rest/updateUserKeepSession/' + user.username, user)
					})
					
					.then(response => {
						console.log(response.data);
						router.push('/users');
					})
			}
			else if (user.role === 'Trainer') {
				axios
					.get('rest/newTraining/allForTrainer/' + user.username)
					.then(response => {
						let trainerTrainingHistory = response.data;
						trainerTrainingHistory.forEach(this.deleteTrainingHistory);
						
						return axios.put('rest/trainings/deleteTrainingsForSelectedTrainer', user);
					})
					.then(response => {
						console.log(response);
						
						return axios.put('rest/updateUserKeepSession/' + user.username, user);
					})
					.then(response => {
						console.log(response.data);
						router.push('/users');
					})
			}
			else if (user.role === 'Manager') {
				axios
					.put('rest/updateUserKeepSession/' + user.username, user)
					.then(response => {
						console.log(response.data);
						router.push('/users');
					})
			}
		},
	
		deleteTrainingHistory(item, index) {
			item.isDeleted = true;
			axios.put('rest/newTraining/' + item.id, item);
		},
	
    	multiSearch() {
			axios
				.get('rest/search/' + this.srchname + '/' + this.srchsurname + '/' + this.srchusername)
				.then(response => {
					this.users = response.data;
				})
		},
		changeSort(columnName) {
			switch(columnName) {
				case 'Name': {
					let copiedUsers = Object.assign([], this.users);
					copiedUsers.sort((a, b) => {
						let fa = a.name.toLowerCase();
						let fb = b.name.toLowerCase();
						
						if (this.sortDirectionName === 'ASC') {
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
					
					if (this.sortDirectionName === 'ASC') {
						this.sortDirectionName = 'DESC';
						this.sortDirectionSurname = 'DESC';
						this.sortDirectionUsername = 'DESC';
						this.sortDirectionPoints = 'DESC';
					}
					else {
						this.sortDirectionName = 'ASC';
						this.sortDirectionSurname = 'ASC';
						this.sortDirectionUsername = 'ASC';
						this.sortDirectionPoints = 'ASC';
					}
					this.users = copiedUsers;
				}
				break;
				case 'Surname': {
					let copiedUsers = Object.assign([], this.users);
					copiedUsers.sort((a, b) => {
						let fa = a.surename.toLowerCase();
						let fb = b.surename.toLowerCase();
						
						if (this.sortDirectionSurname === 'ASC') {
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
					
					if (this.sortDirectionSurname === 'ASC') {
						this.sortDirectionName = 'DESC';
						this.sortDirectionSurname = 'DESC';
						this.sortDirectionUsername = 'DESC';
						this.sortDirectionPoints = 'DESC';
					}
					else {
						this.sortDirectionName = 'ASC';
						this.sortDirectionSurname = 'ASC';
						this.sortDirectionUsername = 'ASC';
						this.sortDirectionPoints = 'ASC';
					}
					this.users = copiedUsers;
				}
				break;
				case 'Username': {
					let copiedUsers = Object.assign([], this.users);
					copiedUsers.sort((a, b) => {
						let fa = a.username.toLowerCase();
						let fb = b.username.toLowerCase();
						
						if (this.sortDirectionUsername === 'ASC') {
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
					
					if (this.sortDirectionUsername === 'ASC') {
						this.sortDirectionName = 'DESC';
						this.sortDirectionSurname = 'DESC';
						this.sortDirectionUsername = 'DESC';
						this.sortDirectionPoints = 'DESC';
					}
					else {
						this.sortDirectionName = 'ASC';
						this.sortDirectionSurname = 'ASC';
						this.sortDirectionUsername = 'ASC';
						this.sortDirectionPoints = 'ASC';
					}
					this.users = copiedUsers;
				}
				break;
				case 'Points': {
					let copiedUsers = Object.assign([], this.users);
					copiedUsers.sort((a, b) => {
						let fa = a.points;
						let fb = b.points;
						
						if (this.sortDirectionPoints === 'ASC') return fa - fb
						
						else return fb - fa
					})
					
					if (this.sortDirectionPoints === 'ASC') {
						this.sortDirectionName = 'DESC';
						this.sortDirectionSurname = 'DESC';
						this.sortDirectionUsername = 'DESC';
						this.sortDirectionPoints = 'DESC';
					}
					else {
						this.sortDirectionName = 'ASC';
						this.sortDirectionSurname = 'ASC';
						this.sortDirectionUsername = 'ASC';
						this.sortDirectionPoints = 'ASC';
					}
					this.users = copiedUsers;
				}
				break;
			}
		}
    },
    computed: {
		filteredUsers: function() {
			return this.users.filter((p) => {
				if ((this.filterrole === '') && (this.filtercustomertype === '')) {
					return true;
				}
				else if ((p.role.toString().match(this.filterrole))
				&& (this.filterrole !== '') 
				&& ((this.filtercustomertype === '') || (p.customerType.name.match(this.filtercustomertype)))) {
					return true;
				}
				else if (((this.filterrole === '') || p.role.toString().match(this.filterrole)) 
				&& (p.customerType.name.match(this.filtercustomertype))
				&& (this.filtercustomertype !== '')) {
					return true;
				}
				return false;
			})
		}	
	}
});









