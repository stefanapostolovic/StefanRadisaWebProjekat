Vue.component("facilities", { 
	data: function () {
	    return {
	      facilities: null
	    }
	},
	    template: ` 
    	<div class="center">
    		<h1>Sportski objekti</h1>
    		<table>
				
	    		<tr v-for="(p, index) in facilities">
	    		<div style="border:solid"><table>
						<tr>
							<td rowspan="2" class="kolona" width="200%" height="200%"><img v-bind:src="p.image" width="200px" height="200px" alt=""></td>
							<td><table>
							<tr>
								<td class="kolona">{{p.name}}</td>
								<td >&nbsp;&nbsp;&nbsp;</td>
	    						<td class="kolona">{{p.objectType}}</td>
								<td>&nbsp;&nbsp;&nbsp;</td>
								<td class="kolona">{{"Prosecna ocena:"+p.averageRating}}</td>
	    						<td>&nbsp;&nbsp;&nbsp;</td>
							</tr>
							</table></td>
						</tr>
						<tr><td>Lokacija:<br>{{p.location.address.street+" "+p.location.address.number}}<br>
								{{p.location.address.city+"  "+p.location.address.zipCode}}<br>
								{{p.location.longitude+",    "+ p.location.latitude}}
								</td>
								<td>Radno vreme:{{p.startTime}}-{{p.endTime}}
								</td>
						</tr>
					</table>
				</div>
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
    		}else
				return "Ne radi";
    	},vreme: function(p) {
		var d =p.toString();   
		
		return d.toString();	
}
}
});