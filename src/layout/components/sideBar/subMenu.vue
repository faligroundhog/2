<template>
  <div>
    <el-submenu v-if="item.children && item.children.length > 0" :index="item.id+''">
      <!-- 具名插槽 -->
      <template slot="title">
        <i :class="item.icon"></i>
        <!-- <span>{{$t(`menus["${item.title}"])`)}}</span> -->
        <span>{{$t(`menus['${item.title}']`)}}</span>
      </template>
      <subMenu v-for="itm in item.children" :key="itm.id" :item="itm"></subMenu>
    </el-submenu>
    <el-menu-item v-else :index="item.url">{{$t(`menus['${item.title}']`)}}</el-menu-item>
  </div>
</template>              

<script>
export default {
    props:['item'],
  name: "subMenu",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
};
</script>
<style scoped lang='scss'>
</style>
