/*Начальные данные, которые потом нужно получать с сервера*/

export default {
    users: [
      {id: 1,
        login: 'a',
        password: 'a'},
      {id: 2,
        login: 'b',
        password: 'b'}
    ],
    tasks: [
      {id: 3,
        id_user: 1,
        name: 'test',
        date: new Date(2016, 6, 12).toLocaleDateString(),
        priority: 1,
        target_time: new Date(2016,6,23).toLocaleDateString(),
        spend_time: false,
        status: 0
        },
      {id: 2,
        id_user: 2,
        name: 'test2',
        date: new Date(2014, 4, 23).toLocaleDateString(),
        priority: 0,
        target_time: new Date(2015, 5,30).toLocaleDateString(),
        spend_time: false,
        status: 0},
      {id: 1,
        id_user: 1,
        name: 'book',
        date: new Date(2016, 5, 21).toLocaleDateString(),
        priority: 2,
        target_time: new Date(2015, 6, 1).toLocaleDateString(),
        spend_time: new Date(2016,6,3).toLocaleDateString(),
        status: 2},
      {id: 4,
        id_user: 1,
        name: 'table',
        date: new Date(2015, 6, 1).toLocaleDateString(),
        priority: 0,
        target_time: new Date(2015, 12, 12).toLocaleDateString(),
        spend_time: false,
        status: 1},
      {id: 5,
        id_user: 1,
        name: 'chair',
        date: new Date(2016, 1, 1).toLocaleDateString(),
        priority: 1,
        target_time: new Date(2016, 4, 3).toLocaleDateString(),
        spend_time:  new Date(2016, 6, 3).toLocaleDateString(),
        status: 2}
    ]
}