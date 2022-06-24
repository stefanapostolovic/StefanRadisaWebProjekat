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
    	<div>
    		<h1>Prikaz korisnika</h1>
    		
    						<!--SEARCH-->
    		<p style="margin-bottom:1cm; margin-top:1cm"/>
    			<input type="text" v-model="srchname" placeholder="search by name"/>
    			<input type="text" v-model="srchsurname" placeholder="search by surname"/>
    			<input type="text" v-model="srchusername" placeholder="search by username"/>
    			<input type="button" @click="multiSearch" value="search"/>
    		</p>
    		
    		<table border="1">				<!--SORT && FILTER-->
    			<tr>
    				<td><input type="button" @click="changeSort('Name')" value="sort"/></td>
    				<td><input type="button" @click="changeSort('Surname')" value="sort"/></td>
    				<td><input type="button" @click="changeSort('Username')" value="sort"/></td>
    				<th rowspan="2" bgcolor="lightgrey">Pol</th>
    				<td><input type="button" @click="changeSort('Points')" value="sort"/></td>
    				<td>
    					<input type="text" v-model="filterrole" placeholder=
    					"filter role"/>
    				</td>
    				<td>
    					<input type="text" v-model="filtercustomertype" placeholder=
    					"filter customer type"/>
    				</td>
    			</tr>
	    		<tr bgcolor="lightgrey">
	    			<th>Ime</th>
	    			<th>Prezime</th>
					<th>Korisnicko ime</th>	
					<th>Poeni</th>
					<th>Uloga</th>
					<th>Tip kupca</th>
				</tr>
	    			
	    		<tr v-for="(p, index) in filteredUsers">
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
				</tr>
	    	</table>
   	</div>		  
    	`,
    mounted () {
        axios
          .get('rest/svi')
          .then(response => (this.users = response.data))
    },
    methods: {
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









