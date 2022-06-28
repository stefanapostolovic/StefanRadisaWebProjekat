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
		      dateOfBirth:''
		    }
	},
	template: ` 
<div style="width:800px; margin:0 auto;">
	<header></header>
	<form>
	<table>
		
	<tr>
		<td>Korisnicko ime:</td>
		<td><input id="username" v-model = "username"  type = "text" name = "username">
		</td>
	</tr>
	<tr>
		<td>Lozinka:</td>
			<td><input type="password" v-model = "password"  name="password"></td>

	</tr>
	<tr>
		<td>Ime:</td>
		<td><input id="ime" v-model = "name"  type = "text" name = "name"></td>	
	</tr>
	<tr>
		<td>Prezime:</td>
		<td><input type="text" v-model = "surename"  name="surename"></td>
	</tr>
	<tr>
		<td>Pol:</td>
		<td><select name="pol" id="pol" v-model = "gender" >
 				  <option value="Male">Musko</option>
				  <option value="Female">Zensko</option>
			</select></td>
	</tr>
	<tr>
		<td>Datum rodjenja:</td>
		<td><input type="date" id="rodjenje" name="rodjenje" v-model = "dateOfBirth"/></td>
	</tr>
	<tr>
		<td>Tip radnika:</td>
		<td><select name="tipRadnika" id="tipRadnika" v-model = "user.role" >
 				  <option value="Manager" selected>Menadžer</option>
				  <option value="Trainer">Trener</option>
			</select></td>
	</tr>
	<tr>
		<td >
		<input type="submit"  v-on:click = "edituser" value="Poslaji">
		<input type="reset" value="Ponisti">
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
				username.style.background = "white"
				sifra.style.background ="white"
				ime.style.background ="white"
				prezime.style.background ="white"
				pol.style.background="white"
				rod.style.background ="white"
			
				if(this.username ==="")
				{
					username.style.background = "red"
					sifra.style.background ="white"
					ime.style.background ="white"
					prezime.style.background ="white"
					pol.style.background="white"
					rod.style.background ="white"	
					return;
				}else if(this.password ===""){	
					sifra.style.background = "red"
					ime.style.background ="white"
					prezime.style.background ="white"
					pol.style.background="white"
					rod.style.background ="white"
					return;
				}else if(this.name===""){
					ime.style.background = "red"
					prezime.style.background ="white"
					pol.style.background="white"
					rod.style.background ="white"
					return;
				}else if(this.surename===""){
					prezime.style.background = "red"
					pol.style.background="white"
					rod.style.background ="white"
		
					return;
				}else if(this.gender===""){
					pol.style.background = "red"
					rod.style.background ="white"
					return;
				}else if(this.dateOfBirth===""){
					rod.style.background = "red"
					return;
				}
			
				rod.style.background ="white"

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