<template>
  <div>
    <b-table striped hover :fields="fields" :items="items">
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template v-slot:cell(title)="data">
        {{ data.item.title }}
      </template>
      <template v-slot:cell(content)="data">
        {{ data.item.content }}
      </template>
      <template v-slot:cell(file)="data">
        <a href="#">{{ data.item.file }}</a>
        <img :src="'./../backend/uploads/' + data.item.file">
      </template>
      <template v-slot:cell(date)="data">
        {{ Date(data.item.date_col_formed) }}
      </template>
    </b-table>
  </div>
</template>

<script>
import { BASE_URL } from "@/components/common/BaseURL.vue";
import { FILE_PATH } from "@/components/common/FilePath.vue";
console.log(FILE_PATH)
import axios from "axios";
export default {
  data() {
    return {
      fields: [
          { key: 'index', label: '번호' },
          { key: 'title', label: '제목' },
          { key: 'content', label: '내용' },
          { key: 'file', label: '첨부 파일' },
          { key: 'date_col_formed', label: '날짜' }
        ],
      items: [

      ]
    }
  },
  methods:{
    async getData(){
      let {data} = await axios.get(`${BASE_URL}/api/post`);
      data = data.map((el) => {
        let elLen = el.file.split('&&')[0].length;
        let fileName = el.file.split('&&' + el.file.split('&&')[1].split('.')[0]);
        el.file = elLen<=10?fileName[0] + fileName[1]:fileName[0].substr(0, 10) + "..." + fileName[1];
        return el;
      })
      this.items = data;
    }
  },
  mounted(){
    this.getData();
  }
}
</script>

<style>

</style>