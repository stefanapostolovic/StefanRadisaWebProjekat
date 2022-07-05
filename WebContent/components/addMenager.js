Vue.component("addMenager", {
	data: function () {
		    return {
			  users:{},
		      user: {username:null, password:null, name:"pedro", surename:null, gender:null, dateOfBirth:null,role:"Manager" },
		      username:'',
		      password:'',
		      name:'',
		      surename:'',
		      gender:'',
		      dateOfBirth:'',
		      
		      //validacija
		      returnFlag: -1,
		      
		      isUsername: false,
		      isPassword: false,
		      isName: false,
		      isSurname: false,
		      isGender: false,
		      isDate: false,
		      isRole: false
		    }
	},
	template: ` 
<div class="container" style="margin-top:5%">
	
	<header>
		<h1>Register a user</h1>
		<br></br>
	</header>
	<form>
	<table>
		
	<tr>
		<td>Korisnicko ime:</td>
		<td>
			<span v-if="isUsername" class="red-text">
	    				&nbsp;&nbsp;Please enter the username
	    	</span>
			<input id="username" v-model = "username"  type = "text" name = "username">
		</td>
	</tr>
	<tr>
		<td>Lozinka:</td>
			<td>
				<span v-if="isPassword" class="red-text">
	    				&nbsp;&nbsp;Please enter the password
	    		</span>
				<input type="password" v-model = "password"  name="password">
			</td>
	</tr>
	<tr>
		<td>Ime:</td>
		<td>
			<span v-if="isName" class="red-text">
	    				&nbsp;&nbsp;Please enter the name
	    	</span>
			<input id="ime" v-model = "name"  type = "text" name = "name">
		</td>	
	</tr>
	<tr>
		<td>Prezime:</td>
		<td>
			<span v-if="isSurname" class="red-text">
	    				&nbsp;&nbsp;Please enter the surname
	    	</span>
			<input type="text" v-model = "surename"  name="surename">
		</td>
	</tr>
	<tr>
		<td>Pol:</td>
		<td>
			<span v-if="isGender" class="red-text">
	    				&nbsp;&nbsp;Please enter the gender
	    	</span>
			<select name="pol" id="pol" v-model = "gender" 
			class="grey darken-4 displaySelect">
 				  <option value="Male">Musko</option>
				  <option value="Female">Zensko</option>
			</select>
		</td>
	</tr>
	<tr>
		<td>Datum rodjenja:</td>
		<td>
			<span v-if="isDate" class="red-text">
	    				&nbsp;&nbsp;Please enter the date
	    	</span>
			<input type="date" id="rodjenje" name="rodjenje" v-model = "dateOfBirth"/>
		</td>
	</tr>
	<tr>
		<td>Tip radnika:</td>
		<td>
			<span v-if="isRole" class="red-text">
	    				&nbsp;&nbsp;Please enter the role
	    	</span>
			<select name="tipRadnika" id="tipRadnika" v-model = "user.role" 
			class="grey darken-4 displaySelect">
 				  <option value="Manager" selected>Menadžer</option>
				  <option value="Trainer">Trener</option>
			</select>
		</td>
	</tr>
	<tr>
		<td >
			<button class="btn" @click="edituser">Poslaji</button>
			<input type="reset" class="btn" value="Ponisti">
		</td>
		<td>
		</td>
	</tr>
		
	</table>
	</form>
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
				/*username.style.background = "white"
				sifra.style.background ="white"
				ime.style.background ="white"
				prezime.style.background ="white"
				pol.style.background="white"
				rod.style.background ="white"*/
			
				if(this.username ==="")
				{
					this.isUsername = true;
					this.returnFlag = 1;
					/*username.style.background = "red"
					sifra.style.background ="white"
					ime.style.background ="white"
					prezime.style.background ="white"
					pol.style.background="white"
					rod.style.background ="white"	
					return;*/
				}
				else {
					this.isUsername = false;
				}
				if(this.password ===""){
					this.isPassword = true;
					this.returnFlag = 1;	
					/*sifra.style.background = "red"
					ime.style.background ="white"
					prezime.style.background ="white"
					pol.style.background="white"
					rod.style.background ="white"
					return;*/
				}
				else {
					this.isPassword = false;
				}
				if(this.name===""){
					this.isName = true;
					this.returnFlag = 1;	
					/*ime.style.background = "red"
					prezime.style.background ="white"
					pol.style.background="white"
					rod.style.background ="white"
					return;*/
				}
				else {
					this.isName = false;
				}
				if(this.surename===""){
					this.isSurname = true;
					this.returnFlag = 1;	
					/*prezime.style.background = "red"
					pol.style.background="white"
					rod.style.background ="white"
		
					return;*/
				}
				else {
					this.isSurname = false;
				}
				if(this.gender===""){
					this.isGender = true;
					this.returnFlag = 1;
					/*pol.style.background = "red"
					rod.style.background ="white"
					return;*/
				}
				else {
					this.isGender = false;
				}
				if(this.dateOfBirth===""){
					this.isDate = true;
					this.returnFlag = 1;
					/*rod.style.background = "red"
					return;*/
				}
				else {
					this.isDate = false;
				}
				//rod.style.background ="white"
				
				if (this.returnFlag == 1) {
					this.returnFlag = -1;
					return;
				}
				
				this.user.username = this.username;
				this.user.password = this.password;
				this.user.name = this.name;
				this.user.surename = this.surename
				this.user.gender = this.gender
				this.user.dateOfBirth = this.dateOfBirth
				console.log(this.user);
				axios.post('rest/register/', this.user)
				.then(response => {
					router.push(`/`)
				})
				.catch(response => {
					toast('Username already taken!')
					//router.push(`/`)
				})
				
		}
	},
	mounted () {
		
    }
});