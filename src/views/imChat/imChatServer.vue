<template>
  <div>
    <iframe
      src="#"
      id="mobsf"
      scrolling="no"
      frameborder="0"
      style="position: absolute; top: 0px; left: 210; right: 0px; bottom: 100px"
    ></iframe>
  </div>
</template>

<script>
import { getIMUser, updateServerChat } from "api/imChat";
export default {
  name: "imChat",
  data() {
    return {
      userid: "",
      username: "",
      url: "#",
      _beforeUnload_time: undefined,
      _gap_time: undefined,
    };
  },
  methods: {
    onloading() {
      getIMUser().then((res) => {
        this.userid = res.result.id;
        this.username = res.result.name;
        this.url =
          "http://localhost:1922/#/imServer?id=" +
          this.userid +
          "&name=" +
          this.username;
        const mobsf = document.getElementById("mobsf");
        mobsf.setAttribute("src", this.url);
      });
    },
    beforeunloadHandler() {
      this._beforeUnload_time = new Date().getTime();
    },
    unloadHandler(e) {
      this._gap_time = new Date().getTime() - this._beforeUnload_time;
      debugger;
      //判断是窗口关闭还是刷新
      if (this._gap_time <= 5) {
        //this.url = "http://localhost:1922/#/imServer?state=off";
      }
    },
  },
  created() {},
  mounted() {
    this.onloading();
    /**
     * iframe-宽高自适应显示
     */
    function changeMobsfIframe() {
      const mobsf = document.getElementById("mobsf");
      const deviceWidth = document.body.clientWidth;
      const deviceHeight = document.body.clientHeight;
      mobsf.style.width = Number(deviceWidth) - 210 + "px"; //数字是页面布局宽度差值
      mobsf.style.height = Number(deviceHeight) - 70 + "px"; //数字是页面布局高度差
    }

    changeMobsfIframe();

    window.onresize = function () {
      changeMobsfIframe();
    };
    window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
    window.addEventListener("unload", (e) => this.unloadHandler(e));
  },
  destroyed() {
    updateServerChat({ serverChatId: this.userid, state: "off" }).then(
      (res) => {}
    );
    // window.removeEventListener("beforeunload", (e) =>
    //   this.beforeunloadHandler(e)
    // );
    // window.removeEventListener("unload", (e) => this.unloadHandler(e));
  },
};
</script>

<style>
</style>