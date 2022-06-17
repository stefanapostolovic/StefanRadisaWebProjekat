Vue.component("zaglavlje", { 
	data: function () {
	    return {
	    }
	},
	    template: ` 
    	<div class="right">

<button v-on:click="aProduct">Prijava</button>  <button v-on:click="registracija">Registracija</button> &nbsp;&nbsp; &nbsp;                                      
<input placeholder="search" type="text" name="pretraga" id="pretraga"/><button >Search</button>

	
    	</div>		  
    	`,
    mounted () {
    },
    methods: {
    	aProduct : function() {
			router.push(`/login`);	    
		},
		registracija : function() {
			router.push(`/`);	    
		}
   }
});