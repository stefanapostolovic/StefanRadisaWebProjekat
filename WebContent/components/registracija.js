Vue.component("registracija", {
	data: function () {
		    return {
		      user: {username:null, password:null, name:"pedro", surename:null, gender:null, dateOfBirth:null },
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
					//if(user.name==""){
																	
					//}
					//axios.post('rest/users', this.user).then(response => (router.push(`/users`)));
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