<template>
  <div>
    <el-popover placement="bottom-start" :width="300" trigger="click">
      <template #reference>
        <el-button type="text" size="large"
          ><i class="el-icon-menu"></i>{{ menuName }}</el-button
        >
      </template>
      <div slot="header" class="clearfix">
        <span>应用中心</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <router-link to="/contract-module">
            <icon-text-button
              :imgUrl="require('@/assets/touzi.png')"
              menuText="合同管理"
            ></icon-text-button>
          </router-link>
        </el-col>
        <el-col :span="8">
          <router-link to="/value-module">
            <icon-text-button
              :imgUrl="require('@/assets/shangpu.png')"
              menuText="产值分配"
            ></icon-text-button>
          </router-link>
        </el-col>
        <el-col :span="8">
          <router-link to="/analysis-module">
            <icon-text-button
              :imgUrl="require('@/assets/tjfx.png')"
              menuText="统计分析"
            ></icon-text-button>
          </router-link>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <router-link to="/setting-module">
            <icon-text-button
              :imgUrl="require('@/assets/tongyong.png')"
              menuText="系统设置"
            ></icon-text-button>
          </router-link>
        </el-col>
      </el-row>
    </el-popover>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import IconTextButton from './iconTextButton.vue'
export default {
  name:'LeftLink',
  data() {
    return {
      menuName: ''
    }
  },
  computed: {
    ...mapGetters(['permission_routes'])
  },
  components: {
    IconTextButton
  },
  mounted() {
    // 根据当前路由来设置menuName的值
    const path = this.$route.matched[0].path
    this.changeMenuText(path);
  },
  watch:{
    // 当前路由改变时, 刷新menuName的值
    $route(to, from) {
      const path = to.matched[0].path
      this.changeMenuText(path);
    },
  },
  methods: {
    // 根据meta.module过滤不同路由并展示到sidebar
    changeMenuText(path) {
      
      switch (path) {
        case '/contract-module':
          this.menuName = '合同管理'
          this.$store.dispatch('permission/filterRoutes','contract')
          break
        case '/analysis-module':
          this.menuName = '统计分析'
          this.$store.dispatch('permission/filterRoutes','analysis')
          break
        case '/value-module':
          this.menuName = '产值分配'
          this.$store.dispatch('permission/filterRoutes','value')
          break
        case '/setting-module':
          this.menuName = '系统设置'
          const payload = {module:'/setting-module',roles:['editor','sky']}
          this.$store.dispatch('permission/filterRoutesByModuleRoles',payload)
          break
        default:
          //这里是没有找到对应的值处理
          this.menuName = '平台主页'
          this.$store.dispatch('permission/filterRoutes','null')
          break
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  .el-button {
    margin-left: 17px;
  }
  .el-button--text {
    color: #5a5e66;
    font-size: 20px;
  }
</style>
