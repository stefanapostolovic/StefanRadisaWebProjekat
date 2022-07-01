Vue.component("facility", { 
	data: function () {
	    return {
	      facility: {"id":null, "name":null, "objectType":null, "status":null,"location":{"longitude":null,"latitude":null,"address":{}}, "image":null, "averageRating":null, "startTime":null, "endTime":null},
	      comment:{"id":null,"isActive":"true","state":"New","sportFacility":{},"text":null,"grade":0,"user":{}},	
		  comments:[],
		  newComment:[],
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
		<h3>Novi Komentari:</h3> 
		<table>
				<tr>
					<th>Komentar</th>
					<th>Ocena</th>
				</tr>
				<tr v-for="(p, index) in newComment">
					<td class="kolona">
							{{p.text}}
					</td>
					<td class="kolona">
						{{p.grade}}
					</td>
					<td><button v-on:click="Odobri(p,index)">Odobri</button> </td>
					<td><button v-on:click="Odbi(p,index)">Odbi</button> </td>
				</tr>
	    	</table>
		<h3>Komentari:</h3> 
		<table>
				<tr>
					<th>Komentar</th>
					<th>Ocena</th>
				</tr>
				<tr v-for="(p, index) in comments">
					<td class="kolona">
							{{p.text}}
					</td>
					<td class="kolona">
						{{p.grade}}
					</td>
					<td name="status">{{status(p.state)}}</td>
				</tr>
	    	</table>
	<h3>Dodaj komentar:</h3> 
		<table hidden>
				<tr>
					</td>
					<td class="kolona">
						<textarea v-model="comment.text"></textarea>
					</td>
					<td name="status">{{status(p.state)}}</td>
				</tr>
	    	</table>
   		</div>		  
    	`,
    mounted () {
//        this.$root.$on('messageFromParent',(text)=>{this.facility = text});
	this.facility=pom
	const korisnik = axios.get('rest/currentUser')
	const jedan = axios.get('rest/comment/acceptedAndRejected/'+this.facility.id)		
	const dva = axios.get('rest/comment/odobreni/'+this.facility.id)
	const tri = axios.get('rest/comment/novi/'+this.facility.id)
	let temp=null;
	axios.all([korisnik,jedan,dva,tri])
				.then(axios.spread((...response) => {
		temp=response[0].data;
		this.comments = response[2].data;
	{	
			if(temp.role =="Administrator" || temp.role=="Manager"){
				this.comments = response[1].data;
				this.newComment = response[3].data;
				return;	
			}else{
			 this.comments = response[2].data;	
				return;
			}
		}
		
		
		
		
    })).catch(response => {
					toast('Wrong username and/or password!')
	
						})},
    methods: {
		Odobri : function(p,index) {
			p.state="Accepted"
			
				axios
	            .put('rest/comment/update/'+p.id, p)
	            .then(response => (this.newComment.splice(index, 1))).catch(response => {
					toast('Wrong username and/or password!')
	
						})
    	},
		Odbi : function(p,index) {
			p.state="Reject"
				axios
	            .put('rest/comment/update', p)
	            .then(response => (this.newComment.splice(index, 1)))
    	},
		radnoVreme : function(p) {
				return "Radno vreme:"+ vreme(p.startTime) +"-"+vreme(p.endTime);
    	},
    	
		status : function(p) {
    		if (p == "Accepted"){
	    		return "Odobren";
    		}
    		else
				return "Odbijen";
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
