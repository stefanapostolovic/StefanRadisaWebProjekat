Vue.component("facility", {
	data() {
		return {
			selectedFacility: {},
			comments: [],
			trainings: []
		}
	},
	template: `
		<div>
			<table>
				<tr>
					<th>Icon</th>
					<th>Name</th>
					<th>Type</th>
					<th>Location</th>
					<th>Rating</th>
					<th>Status</th>
				</tr>
				<tr>
					<td width="100%" height="100%"><img alt="fato" v-bind:src="selectedFacility.image" width="100px" height="100px"></td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{selectedFacility.name}}
						</p>
					</td>
					<td class="kolona">
						{{selectedFacility.objectType}}
					</td>
					<td>
						<p style="width:150px;height=150px">
							{{selectedFacility.location.address.street+" " + selectedFacility.location.address.number}}
						</p>
						<p style="width:150px;height=150px">
							{{selectedFacility.location.address.city + "  " + selectedFacility.location.address.zipCode}}
						</p>
						<p style="width:150px;height=150px">
							{{selectedFacility.location.longitude+",    "+ selectedFacility.location.latitude}}
						</p>
					</td>
					<td>
						<p style="width:150px;height=150px">{{selectedFacility.averageRating}}</p>
					</td>
					<td>
						<p style="width:150px;height=150px">From: {{selectedFacility.startTime}}</p>
						<p style="width:150px;height=100px">Until: {{selectedFacility.endTime}}</p>
					</td>
					<td v-if="selectedFacility.status">Open</td>
					<td v-else="selectedFacility.status">Closed</td>
				</tr>
			</table>
			<hr>
			<h1>Trainings</h1>
			<table>
				<tr>
					<th>Icon</th>
					<th>Name</th>
					<th>Training type</th>
					<th>Duration</th>
					<th>Trainer</th>
					<th>Description</th>
					<th>Price</th>
				</tr>
				<tr v-for="(p, index) in trainings">
					<td width="100%" height="100%">
						<img alt="fato" v-bind:src="p.image" width="100px" height="100px">
					</td>
					<td>
						<p style="width:150px;height=150px">{{p.name}}</p>
					</td>
					<td>
						<p style="width:150px;height=150px">{{p.trainingType}}</p>
					</td>
					<td>
						<p style="width:150px;height=150px">{{p.duration}}</p>
					</td>
					<td>
						<p style="width:150px;height=150px">{{p.trainer.name + ' ' + p.trainer.surename}}</p>
					</td>
					<td>
						<p style="width:150px;height=150px">{{p.description}}</p>
					</td>
					<td>
						<p style="width:150px;height=150px">TEMP PRICE</p>
					</td>
				</tr>
			</table>
			<hr>
			<h1>Comments</h1>
			<table>
				<tr>
					<th>User</th>
					<th>Text</th>
					<th>Grade</th>
				</tr>
				<tr v-for="(p, index) in comments">
					<td>
						<p style="width:150px;height=150px">{{p.user.name + ' ' + p.user.surename}}</p>
					</td>
					<td>
						<p style="width:150px;height=150px">{{p.text}}</p>
					</td>
					<td>
						<p style="width:150px;height=150px">{{p.grade}}</p>
					</td>
				</tr>
			</table>
		</div>
	`,
	methods: {
		
	},
	mounted() {
		
	}
});