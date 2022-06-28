Vue.component("facility", { 
	data: function () {
	    return {
	      facility: {"id":null, "name":null, "objectType":null, "status":null,"location":{"longitude":null,"latitude":null,"address":{}}, "image":null, "averageRating":null, "startTime":null, "endTime":null},
		  comments:[],
		  trainings:[],
		
		}
	},
	    template: ` 
    	<div class="center">
		<h3>{{facility.name}}</h3>
		<table><tr><th>Logo</th>
    				<th>Name</th>
    				<th>Type</th>
    				<th>Location</th>
    				<th>Rating</th>
    				<th>Status</th>
    			</tr>
					<tr>
					<td width="100%" height="100%"><img alt="fato" v-bind:src="facility.image" width="100px" height="100px"></td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{facility.name}}
						</p>
					</td>
					<td class="kolona">
						{{facility.objectType}}
					</td>
					<td>
						<p style="width:150px;height=150px">
							{{facility.location.address.street+" "+facility.location.address.number}}
						</p>
						<p style="width:150px;height=150px">
							{{facility.location.address.city+"  "+facility.location.address.zipCode}}
						</p>
						<p style="width:150px;height=150px">
							{{facility.location.longitude+",    "+ facility.location.latitude}}
						</p>
					</td>
					<td>
						<p style="width:150px;height=150px">{{facility.averageRating}}</p>
					</td>
					<td v-if="facility.status">Open</td>
					<td v-else="facility.status">Closed</td>
				</tr>
	    	</table>    

		
		<table >
				<tr v-for="(p, index) in trainings">
				</tr>
	    	</table>    
		<table >
				<tr v-for="(p, index) in comments">
					<td class="kolona">
							{{p.text}}
					</td>
					<td class="kolona">
						{{p.grade}}
					</td>
				</tr>
	    	</table>
   		</div>		  
    	`,
    mounted () {
//        this.$root.$on('messageFromParent',(text)=>{this.facility = text});
this.facility=pom
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
		},
},
	filters: {
		dateFormat: function(value, format) {
			var parsed = moment(value);
    		return parsed.format(format);
		}
	}
});
