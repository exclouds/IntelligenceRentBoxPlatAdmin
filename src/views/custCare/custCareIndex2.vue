<template>
  <div>
    <el-card>
      <el-button type="primary" size="small" @click="customerDialog()"
        >打开聊天</el-button
      >
    </el-card>
  </div>
</template>

<script>
import { initWebSocket, sendSock, webSocketClose } from "@/utils/websocket.js";
export default {
  data() {
    name: "custCareIndex";
    return {
      // 这个地址是后端给的，用来连接websocket。 加密wss 未加密ws
      // wsUrl: "ws://地址",
      wsUrl: "ws://localhost:5000",
    };
  },
  // 从store中获取接收到的信息
  computed: {
    getSocketMsg() {
      return this.$store.state.user.webSocketMsg;
    },
  },
  //监控 getSocketMsg 是否有接收到数据
  watch: {
    getSocketMsg: {
      handler: function (val) {
        this.getConfigResult(val);
      },
    },
    //这一步是我对我聊天框的css设计，大家可以不用写，需要的时候再参考。
    //我将接收到的信息和发出的信息都存储到obList中，然后通过监控数值变化，使聊天定位始终位于底部（css中 overflow: auto;）
    obList: {
      handler: function (val) {
        this.$nextTick(() => {
          this.$refs.chatContent.scrollTop =
            this.$refs.chatContent.scrollHeight;
        });
      },
    },
    immediate: true,
  },
  methods: {
    // 点击按钮-建立聊天连接
    customerDialog() {
      initWebSocket(this.wsUrl);
    },
    // 接收socket回调函数返回数据的方法,这个函数是我在监控接受数据的时候调用的（上面的watch中）
    getConfigResult(val) {},

    // 点击发送按钮 发送信息---发送信息的格式要和后端确认
    sending() {
      sendSock("发送的信息");
    },
    // 处理聊天框关闭事件
    handleClose() {
      //关闭连接
      webSocketClose();
    },
  },
};
</script>

<style>
</style>