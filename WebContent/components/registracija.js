Vue.component("registracija", {
	data: function () {
		    return {
			  users:{},
		      user: {username:null, password:null, name:"pedro", surename:null, gender:null, dateOfBirth:null,role:"Customer" },
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
		      isDate: false
		    }
	},
	template: ` 
<div class="container" style="margin-top:5%">
	<header></header>
	<form>
		<h1>Register</h1>
		<table style="margin-top:6%">
			
		<tr>
			<td>Username:</td>
			<td>
				<span v-if="isUsername" class="red-text">
	    				&nbsp;&nbsp;Please enter the username
	    		</span>
				<input id="username" v-model = "username"  type = "text" name = "username">
			</td>
		</tr>
		<tr>
			<td>Password:</td>
				<td>
					<span v-if="isPassword" class="red-text">
	    				&nbsp;&nbsp;Please enter the password
	    			</span>
					<input type="password" v-model = "password"  name="password">
				</td>
	
		</tr>
		<tr>
			<td>Name:</td>
			<td>
				<span v-if="isName" class="red-text">
	    				&nbsp;&nbsp;Please enter the name
	    		</span>
				<input id="ime" v-model = "name"  type = "text" name = "name">
			</td>	
		</tr>
		<tr>
			<td>Surname:</td>
			<td>
				<span v-if="isSurname" class="red-text">
	    				&nbsp;&nbsp;Please enter the surname
	    		</span>
				<input type="text" v-model = "surename"  name="surename">
			</td>
		</tr>
		<tr>
			<td>Gender:</td>
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
			<td>Date of birth:</td>
			<td>
				<span v-if="isDate" class="red-text">
	    				&nbsp;&nbsp;Please enter the date
	    		</span>
				<input type="date" id="rodjenje" name="rodjenje" v-model = "dateOfBirth"/>
			</td>
		</tr>
		
		<tr>
			<td >
				<button class="btn" @click="edituser">Confirm</button>
				<input type="reset" class="btn" value="Reset">
			</td>
			<td></td>
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
					/*username.style.background = "red"
					sifra.style.background ="white"
					ime.style.background ="white"
					prezime.style.background ="white"
					pol.style.background="white"
					rod.style.background ="white"	
					return;*/
					this.isUsername = true
					this.returnFlag = 1;
				}
				else {
					this.isUsername = false;
				}
				if(this.password ===""){	
					/*sifra.style.background = "red"
					ime.style.background ="white"
					prezime.style.background ="white"
					pol.style.background="white"
					rod.style.background ="white"
					return;*/
					this.isPassword = true;
					this.returnFlag = 1;
				}
				else {
					this.isPassword = false;
				}
				if(this.name===""){
					/*ime.style.background = "red"
					prezime.style.background ="white"
					pol.style.background="white"
					rod.style.background ="white"
					return;*/
					this.isName = true;
					this.returnFlag = 1;
				}
				else {
					this.isName = false;
				}
				if(this.surename===""){
					/*prezime.style.background = "red"
					pol.style.background="white"
					rod.style.background ="white"
		
					return;*/
					this.isSurname = true;
					this.returnFlag = 1;
				}
				else {
					this.isSurname = false;
				}
				if(this.gender===""){
					/*pol.style.background = "red"
					rod.style.background ="white"
					return;*/
					this.isGender = true;
					this.returnFlag = 1;
				}
				else {
					this.isGender = false;
				}
				if(this.dateOfBirth===""){
					/*rod.style.background = "red"
					return;*/
					this.isDate = true;
					this.returnFlag = 1;
				}
				else {
					this.isDate = false;
				}
				
				//rod.style.background ="white"
				
				if (this.isDate == 1) {
					this.isDate = -1;
					return;
				}
				this.isDate = -1;
		
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