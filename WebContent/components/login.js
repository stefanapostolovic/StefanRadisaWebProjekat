Vue.component("login", { 
	data: function () {
	    return {
	     //user:null
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
			//axios
				//.post('rest/login' + this.username, this.password)
			//router.push(`/`);	    
		}
   }
});