const Facilitys = { template: '<facilities></facilities>' }
const Header = { template: '<zaglavlje></zaglavlje>' }
const Login = { template: '<login></login>' }
const Registracija = { template: '<registracija></registracija>' }
const Profil = { template: '<profil></profil>' }
const Korisnici = { template: '<users></users>' }
const Facility = { template: '<facility></facility>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [{ path: '/zaglavlje', component: Header},
		{ path: '/', name: 'home', component: Facilitys},
		{ path: '/login', component: Login},
		{ path: '/registracija', component: Registracija},
		{ path: '/profil', component: Profil},
		{ path: '/users', component: Korisnici},
		{ path: '/facility', component: Facility},
]
});

var app = new Vue({
	router,
	el:'#products'
});