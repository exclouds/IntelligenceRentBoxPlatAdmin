<template>
     <div>
       <span>正在跳转，请稍后...</span>
     </div>
</template>

<script>

export default {
  methods: {
    onloading() {
      //window.open="http://47.103.117.243:1922/customer";
      window.open('http://47.103.117.243:1922/customer', '_blank')
    },
    
  },
  mounted() {
    this.onloading()
  },
};
</script>