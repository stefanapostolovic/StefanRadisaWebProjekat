Vue.component("facilities", { 
	data: function () {
	    return {
	      facilities: [],
	      searchname: '',
	      searchtype: '',
	      searchlocation: '',
	      searchrating: ''
	    }
	},
	    template: ` 
    	<div class="center">
    		<h1>Sportski objekti</h1>
    		<table style="border:solid">
    			<tr>
    				<th rowspan="2">Icon</th>
    				<th>Name</th>
    				<th>Type</th>
    				<th>Location</th>
    				<th>Rating</th>
    			</tr>
    			<tr>
    				<td><input type="text" v-model="searchname" placeholder="search name"/></td>
    				<td><input type="text" v-model="searchtype" placeholder="search type"/></td>
    				<td><input type="text" v-model="searchlocation" placeholder="search location"/></td>
    				<td><input type="text" v-model="searchrating" placeholder="search rating"/></td>
    			</tr>
				<tr v-for="(p, index) in filteredFacilities">
					<td width="100%" height="100%"><img v-bind:src="p.image" width="100px" height="100px" alt=""></td>
					<td class="kolona">{{p.name}}</td>
					<td class="kolona">{{p.objectType}}</td>
					<td>
						{{p.location.address.street+" "+p.location.address.number}}<br>
						{{p.location.address.city+"  "+p.location.address.zipCode}}<br>
						{{p.location.longitude+",    "+ p.location.latitude}}
					</td>
					<td>
						{{p.averageRating}}
					</td>
				</tr>
	    	</table>
   		</div>		  
    	`,
    mounted () {
        axios
          .get('rest/facilities/')
          .then(response => (this.facilities = response.data))
    },
    methods: {
	
		radnoVreme : function(p) {
				return "Radno vreme:"+ vreme(p.startTime) +"-"+vreme(p.endTime);
    	},
    
		radi : function(p) {
    		if (p.status === true){
	    		return "Radi";
    		}
    		else
				return "Ne radi";
    	},
    	vreme: function(p) {
			var d =p.toString();   
			return d.toString();	
		}
	},
	computed:{
		filteredFacilities: function(){
			return this.facilities.filter((p) => {
				//return (p.name.match(this.searchname)
				//);
				if (this.searchname === '' && (this.searchtype === '')
				&& (this.searchrating === '') 
				&& (this.searchlocation === '')) {
					return true
				}
				else if (p.name.match(this.searchname) && (this.searchname !== '')) {
					return true;
				}
				
				else if (p.objectType.match(this.searchtype) && (this.searchtype !== '')){
					return true;
				}
				else if (p.averageRating.toString().match(this.searchrating) && (this.searchrating !== '')) {
					return true;
				}
				else if (p.location.address.city.match(this.searchlocation)
				&& (this.searchlocation !== '')) {
					return true;
				}
				return false;
			})
		}
	}
});









