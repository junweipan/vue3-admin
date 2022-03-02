<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <img
          :src="avatar + '?imageView2/1/w/80/h/80'"
          class="user-avatar right-menu-item hover-effect"
        />
        <div class="right-menu-item hover-effect">
          <el-dropdown :hide-on-click="true" trigger="click">
            <el-button type="primary">
              <i class="el-icon-user"></i>{{ roleName
              }}<el-icon class="el-icon--right"></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="role in operator.roleInfoList"
                  @click="selectRole(role)"
                >
                  <user-card
                    :id="role.roleId"
                    :branch="operator.brhName"
                    :roleType="role.roleType"
                    :roleName="role.roleName"
                  ></user-card>
                </el-dropdown-item>
              </el-dropdown-menu>

              <el-dropdown-menu class="logout">
                <el-dropdown-item>
                  <el-row>
                    <el-col :span="12" style="width: 100%; text-align: center">
                      <el-button type="primary" @click.native="onEditInfo" plain
                        >修改信息</el-button
                      >
                    </el-col>
                    <el-col :span="12" style="width: 100%; text-align: center">
                      <el-button type="warning" @click.native="onLogout" plain
                        >安全退出</el-button
                      >
                    </el-col>
                  </el-row>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// 角色ID  角色名称
// 1	   开发人员
// 11	   超级管理员
// 19	   公司领导
// 21	   工程主持人
// 22	   产值分配经办人
// 62	   中层领导（财务主管所室负责人）
// 64	   普通员工
// 65	   产值工作人员
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import UserCard from './UserCard'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
    UserCard
  },
  data() {
    return {
      roleName: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'operator',
      'currentRoleID',
      'permission_routes'
    ])
  },
  mounted() {
    this.roleName = this.operator.roleName
    console.log('this.operator', this.operator)
  },
  methods: {
    onEditInfo(event) {
      console.log(event)
    },
    selectRole(role) {
      this.roleName = role.roleName
      //刷新roleID -> store, cookie
      this.$store.dispatch('user/changeRole', role.roleId)
      // console.log('currentRoleID', this.currentRoleID)
      //根据module和role刷新sidebar menu
      const path = this.$route.matched[0].path
      // console.log('path', path)
      if (path == '/') {
        return
      }
      const payload = { module: path, roles: [this.currentRoleID] }
      this.$store.dispatch('permission/filterRoutesByModuleRoles', payload)

      // console.log(
      //   'change role permission_routes',
      //   this.permission_routes[7].children[0]
      // )
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async onLogout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.logout {
  overflow: hidden;
}
.el-dropdown-menu {
  max-height: 200px;
  overflow-x: hidden;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          //position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
