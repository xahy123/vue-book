import Vue from 'vue'
import Router from 'vue-router'
import Sort from '@/views/sort/index.vue'
import Selection from '@/views/treasure'
import Ranking from '@/views/rank/index.vue'
import SortDetail from '@/views/sort/detail.vue'
import Kinds from '@/views/rank/detail.vue'
import BookInfo from '@/components/book-detail'
import Info from '@/components/info/inde.vue'
import Text from '@/components/text/index.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
			path:'/',
			redirect:"/sort"
    },
    {
      path: '/sort',
      component:Sort,
      children:[
        {
          path:"/sort/:id/:type",
          component:SortDetail,
          children:[
            {
              path:"/book/:x",
              component:BookInfo,
              children:[
                {
                  path:"/book/:y/chapter",
                  component:Info,
                  children:[
                    {
                      path:'/bos/:x',
                      component:Text
                    }
                  ]
                },
              ]
            }
          ]
        }
      ]
    },
   
    {
      path: '/selection',
      component:Selection
    },
    {
      path: '/ranking',
      component:Ranking,
      children:[
        {
          path:'/ranking/:zhou/:yue/:zong',
          component:Kinds
        }
      ]
    },
  ]
})
