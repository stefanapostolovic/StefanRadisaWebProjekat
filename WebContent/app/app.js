const Facilitys = { template: '<facilities></facilities>' }
const Header = { template: '<zaglavlje></zaglavlje>' }
const Login = { template: '<login></login>' }
const Registracija = { template: '<registracija></registracija>' }
const Profil = { template: '<profil></profil>' }
const Korisnici = { template: '<users></users>' }
const Radnici = { template: '<addMenager></addMenager>' }
const Facility={template:'<facility></facility>'}
const CreateFacility = { template: '<createFacility></createFacility>'}
const CreateTraining = { template: '<createTraining></createTraining>'}
const ViewTraining = { template: '<viewTraining></viewTraining>'}
const ManagerInfo = { template: '<managerInfo></managerInfo>'}
const TrainerInfo = { template: '<trainerInfo></trainerInfo>'}
const Membership = {template:'<membership></membership>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/zaglavlje', component: Header},
		{ path: '/', name: 'home', component: Facilitys},
		{ path: '/login', component: Login},
		{ path: '/registracija', component: Registracija},
		{ path: '/profil', component: Profil},
		{ path: '/users', component: Korisnici},
		{ path: '/radnici', component: Radnici},
		{ path: '/facility', component: Facility},
		{ path: '/createFacility', component: CreateFacility},
		{ path: '/createTraining', component: CreateTraining},
		{ path: '/viewTraining', component: ViewTraining},
		{ path: '/managerInfo', component: ManagerInfo},
		{ path: '/trainerInfo', component: TrainerInfo},
		{ path: '/membership', component: Membership}
	]
});

var pom ={"id":null, "name":null, "objectType":null, "status":null,"location":null, "image":null, "averageRating":null, "startTime":null, "endTime":null};


var app = new Vue({
	router,
	el:'#products'
});