export const userNavigation = [
  {
    text: 'Anasayfa',
    path: '/user/home',
    icon: 'home'
  },
  {
    text: 'Examples',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/user/profile'
      },
      {
        text: 'Tasks',
        path: '/user/tasks'
      }
    ]
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
        text: 'Hasta Detay Sayfasi',
        path: 'doctor/patient-info/:tckimlikno'
  },
  {
    text: 'Examples',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/doctor/profile'
      },
      {
        text: 'Tasks',
        path: '/doctor/tasks'
      }
    ]
  }
];


export const adminNavigation = [
  {
    text: 'Anasayfa',
    path: '/admin/home',
    icon: 'home'
  },
  {
    text: 'Examples',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/admin/profile'
      },
      {
        text: 'Tasks',
        path: '/admin/tasks'
      }
    ]
  }
];
