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
      icon: 'message'},
  {
    text: 'Form İstekleri',
    path: '/user/dynamic-form-request',
    icon: 'paste'
  }
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
  },
  {
    text: 'Hazır Formlar',
    path: '/doctor/form-templates',
    icon:"paste"
  }
];


export const adminNavigation = [
  {
    text: 'Admin Paneli',
    path: '/admin/home',
    icon: 'home'
  },
  {
    text:"Hasta Listesi",
    path: '/admin/patientcrud',
    icon:"group"
  },
  {
    text: "Yeni Kayıt Hasta",
    path: '/admin/newregistredpatient',
    icon: "group"
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
