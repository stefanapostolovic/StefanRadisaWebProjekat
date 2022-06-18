Vue.component("login", { 
	data: function () {
	    return {
	     //user:{},
	     username : "",
	     password : ""
	    }
	},
	    template: ` 
    	<div class="centar">
	<form id="forma" @submit.prevent="aProduct">
		<table>
			<tr><td>Username</td><td><input type="text" name="username" v-model="username"></td></tr>
			<tr><td>Password</td><td><input type="password" name="password" v-model="password"></td></tr>
			<tr><td><input type="submit" value="Login"></td></tr>
		</table>
	</form>


    	</div>		  
    	`,
    mounted () {
    },
    methods: {
    	aProduct : function() {
			//this.user.username = this.username
			//this.user.password = this.password
			axios
				.post('rest/login', {username:this.username, password:this.password})
				.then(response => {
					router.push(`/`)
				})
				.catch(response => {
					toast('Wrong username and/or password!')
					//router.push(`/`)
				})	    
		}
   }
});