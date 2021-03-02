export const userNavigation = [
  {
    text: 'Anasayfa',
    path: '/user/home',
    icon: 'home'
  },
  {
    text: 'Profil',
    path: '/user/profile',
    icon: 'user'
  },
  {
    text: 'Video İstekleri',
    path: '/user/user-video-submit',
    icon: 'runner'},
    {
      text: 'Mesajlar',
      path: '/user/message',
      icon: 'message'}
];

export const doctorNavigation = [
  {
    text: 'Anasayfa',
    path: '/doctor/home',
    icon: 'home'
  },

  {
    text: 'Egzersizler',
    path: '/doctor/exercises',
    icon: 'runner'
  },
  {
    text:"Hastalar",
    path:"/doctor/getall",
    icon:"group"
  },
  {
    text: 'Profil',
    path: '/doctor/profile',
    icon:"user"
  }
];


export const adminNavigation = [
  {
    text: 'Anasayfa',
    path: '/admin/home',
    icon: 'home'
  },
  {
    text:"Hasta Listesi",
    icon:"group"
  },
  {
    text: 'Doktor Listesi',
    path: '/admin/doctorscrud',
    icon:"user"
  },
  {
    text: 'Admin Listesi',
    path:"/admin/adminscrud",
    icon:"user"
  }
];
