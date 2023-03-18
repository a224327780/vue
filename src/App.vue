<script>

import {reactive, ref} from "vue";

export default {
  setup() {

    const uploadInput = ref(null)
    const state = reactive({
      progress: 0,
      status: 0,
      upload_url: '',
      upload_html: '',
      upload_bbcode: '',
      upload_markdown: ''
    })
    const clickUpload = (e) => {
      console.log(uploadInput.value)
      uploadInput.value.click()
    }
    const pasteUpload = (e) => {
      const items = (e.clipboardData || window.clipboardData).items;
      if (!items || items.length === 0) {
        alert("当前浏览器不支持本地");
        return;
      }
      let file = null
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          file = items[i].getAsFile();
          break;
        }
      }
      if (!file) {
        alert("粘贴内容非图片");
        return;
      }
      file_upload(file)
    }
    const fileChange = (e) => {
      console.log(e)
      if (e.target.files.length <= 0) {
        return
      }
      const file = e.target.files[0]
      const file_type = file.type.toLowerCase()
      if (!file_type.includes('image')) {
        alert('请选择图片文件')
      }
      file_upload(file)
    }

    const file_upload = (file) => {
      const upload_url = 'https://api01.eu.org/devops/love01/upload'
      let formData = new FormData();
      formData.append('file', file);

      state.status = 0
      state.progress = 0

      let xhr = new XMLHttpRequest();
      xhr.open('POST', upload_url);
      xhr.upload.addEventListener('progress', function (e) {
        state.progress = Math.max(100, (e.loaded / e.total) * 100);
      }, false);
      xhr.addEventListener('load', function (e) {
        console.log(e.target)
        if (e.target.status === 200) {
          let obj = JSON.parse(e.target.responseText);
          state.upload_url = (typeof (obj['data']) == 'string') ? obj['data'] : obj['data'][0]
          state.upload_html = `<img src="${state.upload_url}"/>`
          state.upload_markdown = `![](${state.upload_url})`
          state.upload_bbcode = `[img]${state.upload_url}[/img]`
          state.status = 1
          state.progress = 0
        }
      }, false);
      xhr.send(formData);
    }

    return {
      pasteUpload,
      clickUpload,
      fileChange,
      uploadInput,
      state
    }
  }
}
</script>
<template>
  <div class="progress" :style="{'width': state.progress + '%'}"></div>
  <div class="page" @paste="pasteUpload">
    <div class="header">
      <div class="container mx-auto">
        <a href="/"><h1 class="py-4 text-3xl">在线图床</h1></a>
      </div>
    </div>
    <div class="container content">
      <div class="upload-box" @click="clickUpload">
        <input type="file" class="hidden" accept="image/*" ref="uploadInput" @change="fileChange">
        <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDg5LjQgNDg5LjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4OS40IDQ4OS40OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTM4Mi40LDQyMi43NWgtNzkuMUgyODJoLTQuNnYtMTA2LjFoMzQuN2M4LjgsMCwxNC0xMCw4LjgtMTcuMmwtNjcuNS05My40Yy00LjMtNi0xMy4yLTYtMTcuNSwwbC02Ny41LDkzLjQNCgkJCWMtNS4yLDcuMi0wLjEsMTcuMiw4LjgsMTcuMmgzNC43djEwNi4xaC00LjZIMTg2SDk0LjNjLTUyLjUtMi45LTk0LjMtNTItOTQuMy0xMDUuMmMwLTM2LjcsMTkuOS02OC43LDQ5LjQtODYNCgkJCWMtMi43LTcuMy00LjEtMTUuMS00LjEtMjMuM2MwLTM3LjUsMzAuMy02Ny44LDY3LjgtNjcuOGM4LjEsMCwxNS45LDEuNCwyMy4yLDQuMWMyMS43LTQ2LDY4LjUtNzcuOSwxMjIuOS03Ny45DQoJCQljNzAuNCwwLjEsMTI4LjQsNTQsMTM1LDEyMi43YzU0LjEsOS4zLDk1LjIsNTkuNCw5NS4yLDExNi4xQzQ4OS40LDM2Ni4wNSw0NDIuMiw0MTguNTUsMzgyLjQsNDIyLjc1eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"/>
        <p>点击选择图片或直接粘贴文件</p>
      </div>
      <div class="upload-result" :style="{'display': state.status ? 'block' : 'none'}">
        <div class="flex">
          <div class="flex-none w-2/5">
            <img class="object-cover" :src="state.upload_url">
          </div>
          <div class="flex-auto pl-6">
            <div class="form-group">
              <label class="form-label">URL</label>
              <input class="form-input" type="text" :value="state.upload_url">
            </div>
            <div class="form-group">
              <label class="form-label">HTML</label>
              <input class="form-input" type="text" :value="state.upload_html">
            </div>
            <div class="form-group">
              <label class="form-label">BBCode</label>
              <input class="form-input" type="text" :value="state.upload_bbcode">
            </div>
            <div class="form-group">
              <label class="form-label">Markdown</label>
              <input class="form-input" type="text" :value="state.upload_markdown">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>