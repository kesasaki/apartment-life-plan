<template>
  <div class="buttons">
    <div class="copyButton">
      <button class="copy" @click="copyUrlToClipboard">結果をシェア</button>
    </div>
    <div class="clearButton">
      <button class="clear" @click="clearParams">クリア</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CopyButton',
  components: {},
  props: {},
  methods: {
    // 現在のURLをクリップボードにコピー
    async copyUrlToClipboard() {
      const url = window.location.href;
      try {
        await navigator.clipboard.writeText(url);
        alert("現在のグラフをクリップボードにコピーしました: " + url);
      } catch (error) {
        console.error("URLのコピーに失敗しました: ", error);
      }
    },
    // URLパラメータ削除
    clearParams() {
      const currentUrl = new URL(window.location.href);
      currentUrl.search = "";
      window.location.href = currentUrl.toString();
    }
  },
}
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
}

.copyButton, .clearButton {
  margin: 0 10px;
}

button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  color: #111;
}

.copy {
  background-color: #98c0ff;
}

.clear {
  background-color: #FFCDD2;
}

.copy:hover {
  color: #fff;
  background-color: #0069d9;
}

.clear:hover {
  color: #fff;
  background-color: #F4527D;
}
</style>