const Facilitys = { template: '<facilities></facilities>' }
const Header = { template: '<zaglavlje></zaglavlje>' }
const Login = { template: '<login></login>' }
const Registracija = { template: '<registracija></registracija>' }
const Profil = { template: '<profil></profil>' }


const router = new VueRouter({
	mode: 'hash',
	  routes: [{ path: '/zaglavlje', component: Header},
		{ path: '/', name: 'home', component: Facilitys},
		{ path: '/login', component: Login},
		{ path: '/registracija', component: Registracija},
		{ path: '/profil', component: Profil},
]
});

var app = new Vue({
	router,
	el:'#products'
});