Vue.component("facility", { 
	data: function () {
	    return {
	      facility: {"id":null, "name":null, "objectType":null, "status":null,"location":{"longitude":null,"latitude":null,"address":{}}, "image":null, "averageRating":null, "startTime":null, "endTime":null},
	      comment:{"id":0,"active":true,"state":"New","sportFacility":{"id":null,"name":null,"objectType":null,"status":true,"location":{"id":null,"longitude":null,"latitude":null,"address":{"street":null,"number":null,"city":null,"zipCode":null}},"image":null,"averageRating":null,"startTime":null,"endTime":null},"text":"","grade":0,"user":{"username":null,"password":null,"name":null,"surename":null,"gender":null,"dateOfBirth":null,"role":null,"trainingHistory":null,"membership":null,"sportFacility":null,"visitedFacilities":null,"points":1.0,"customerType":{"name":null,"discount":0.0,"points":0.0}}},
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

		<h3 name="noviKomentari">Novi Komentari:</h3> 
		<table name="tabelaNovi">
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
		<table name="coment" hidden>
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
					<td id="state" name="state" >{{status(p.state)}}</td>
				</tr>
	    	</table>


		<table name="coment1" hidden>
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
				</tr>
	    	</table>

		<h3 name="naslov" hidden>Dodaj komentar:</h3> 
		<form name="komentar" hidden>
		<table >
		
		<tr>
		<th>Komentar:</th>
		<th>Ocjena:</th>
		</tr>
				<tr>
					<td class="kolona">
						<textarea v-model="comment.text" width="100%"></textarea>
					</td>
					<td>
					<input type="radio" id="age1" name="ocena" value="1">
  					<label for="age1">1</label><br>
					<input type="radio" id="age1" name="ocena" value="2">
  					<label for="age1">2</label><br>
					<input type="radio" id="age1" name="ocena" value="3">
  					<label for="age1">3</label><br>
					<input type="radio" id="age1" name="ocena" value="4">
  					<label for="age1">4</label><br>
					<input type="radio" id="age1" name="ocena" value="5" checked>
  					<label for="age1">5</label><br>
					</td>
				</tr>
				<tr>
				<input type="submit" v-on:click="addCommentFunkcija" value="Dodaj komentar">
				</tr>
	    	</table>
	</form>			
	
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
	this.comment.sportFacility = this.facility;
		
	axios.all([korisnik,jedan,dva,tri])
				.then(axios.spread((...response) => {
		temp=response[0].data;
		this.comments = response[2].data;
		let p = document.getElementsByName("naslov")[0]
		let p1= document.getElementsByName("komentar")[0]
		let p2 = document.getElementsByName("noviKomentari")[0]
		let p3= document.getElementsByName("tabelaNovi")[0]
		let n = document.getElementsByName("coment")[0]
		let n1 = document.getElementsByName("coment1")[0]
		n.hidden = true;
		n1.hidden= true;
		p.hidden=true;	
		p1.hidden=true;		
		p2.hidden=true;
		p3.hidden=true;
		
	
		if(temp!=""){	
			if(temp.role =="Administrator" || temp.role=="Manager"){
				this.comments = response[1].data;
				this.newComment = response[3].data;
					n.hidden=false;
	
				if(this.newComment.length > 0){
					p2.hidden=false;
					p3.hidden=false;
				}
				return;	
			}else{
	
		
				n1.hidden=false;
				p.hidden=false;
				p1.hidden=false;
				this.comment.user=temp;
			 	this.comments = response[2].data;	
				return;
			}
		}
		
		
		
		
    })).catch(response => {
					toast('')
	
						})},
    methods: {
	addCommentFunkcija:function(){
		event.preventDefault();
		let n = document.getElementsByName("naslov")[0]
		let n1= document.getElementsByName("komentar")[0]
		n.hidden=true;
		n1.hidden=true;		
		let values = document.getElementsByName("ocena");
		
	for(let i = 0; i < values.length; i++) {
   		if(values[i].checked == true) {
       	this.comment.grade = values[i].value;
   	}}

		axios
		.post('rest/comment/dodavanje',this.comment)
		.then(response=>{}).catch(response=>{toast("Vec postoji komentar koji je dodat")})
	},
		
		Odobri : function(p,index) {
			p.state="Accepted"
			
				axios
	            .put('rest/comment/update/'+p.id, p)
	            .then(response => (this.newComment.splice(index, 1))).catch(response => {
					toast('')
	
						})
    	},
		Odbi : function(p,index) {
			p.state="Rejected"
				axios
	            .put('rest/comment/update/'+p.id, p)
	            .then(response => {this.newComment.splice(index, 1);
					comments.add(p);
					}).catch(response => {
					toast('')
	
						})
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
