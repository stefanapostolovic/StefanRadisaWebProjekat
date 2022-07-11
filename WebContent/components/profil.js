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
			  personalni:false
		    }
	},
	template: ` 
<div class="container ">
	<header></header>
	<h1 style="margin-bottom:10%; margin-top:5%">Profile</h1>
	<form>
	<table>
		
	<tr style=" border-bottom: thin solid; border-top: thin solid;">
		<td>Korisnicko ime:</td>
		<td><input  id="username" v-model = "user.username" class="white-text" disabled
		type = "text" name = "username">
		</td>
	</tr>
	<tr>
		<td>Lozinka:</td>
			<td><input type="password" v-model = "user.password"  name="password"></td>

	</tr>
	<tr>
		<td>Ime:</td>
		<td><input id="ime" v-model = "user.name"  type = "text" name = "name"></td>	
	</tr>
	<tr>
		<td>Prezime:</td>
		<td><input type="text" v-model = "user.surename"  name="surename"></td>
	</tr>
	<tr>
		<td>Pol:</td>
		<td><select name="pol" id="pol" v-model = "user.gender" 
			class="displaySelect grey darken-4">
 				  <option value="Male">Musko</option>
				  <option value="Female">Zensko</option>
			</select></td>
	</tr>
	<tr>
		<td>Datum rodjenja:</td>
		<td><input type="date" id="rodjenje" name="rodjenje" v-model="user.dateOfBirth"/></td>
	</tr>
	<tr>
		<td >
			<button class="btn" @click="edituser">
				Posalji
	    	</button>
		</td>
		<td></td>
	</tr>	
	</table>
	</form>
<label hidden name="lab">Postoji vec registrovan korisnik sa ovim korisnickim imenom.</label>

<br>
<br>
<br>
<h3 v-if="personalni" class="teal darken-2" style="margin-bottom:5%">
					Treninzi
				</h3>
<table v-if="personalni">
					<tr class="tableRowBorder">
						<th>Naziv treninga</th>
						<th>Naziv objekta</th>
						<th>Datum treniranja</th>
					</tr>
					<tr v-for="(p, index) in history" class="tableRowBorder"
					:style="{background: p.isCanceled == true ? '#4a148c' : '#212121'}">
						<td>
							{{p.training.name}}
						</td>
						<td>
							<p clas="tableRow">
								{{p.training.sportFacility.name}}
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
		}
	},mounted () {
		this.personalni=false;
		axios.get('rest/currentUser').
				then(response => {this.user =  response.data;
				if(this.user.role=="Customer"){
					this.personalni=true;
				}
				return axios.get('rest/newTraining/allForCustomer/'+this.user.username)
				}).then(response=>(this.history = response.data))
						
				 }
});