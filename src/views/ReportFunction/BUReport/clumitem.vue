<template>
  <el-table-column
    :prop="col.attribute"
    :label="col.title"
    :sortable="!col.children||col.children.length==0?'custom':false"
    align="center">
    <template v-if="col.children">
      <column-item v-for="(item, index) of col.children" :key="index" :col="item"></column-item>
    </template>
    <template slot-scope="scope">
      <span :class="{can_click:scope.row[col.attribute].statisticsType==1}">{{ scope.row[col.attribute].valueStr }}</span>
    </template>
  </el-table-column>


</template>

<script>


export default {
  name: 'clumitem',
  components: {  },
  props: {
      clumitem: {
          type: Object,
        }
   
  },
  data() {
    return {
      onlyOneChild: null
    }
  },

  methods: {



  }
}
</script>
