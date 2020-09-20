<template>
  <div style="min-height: 100vh;">
    <div class="h3 bg-primary p-4 text-white w-100 text-center">Language Skill</div>
    <ul v-if="skills.length" class="w-75 ml-auto mr-auto mt-5 skill-list">
      <li class="list-group-item d-flex align-items-center p-4" v-for="skill in skills" :key="skill.id">
        <div class="w-25">{{skill.lang}}</div>
        <div class="col-sm-10 pt-1">
          <b-progress :value="skill.progress" :max="max" animated></b-progress>
        </div>
        <div class="w-25 text-center">{{skill.progress}}%</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      max: 100,
      skills: [
        {lang: "C", progress: 95},
        {lang: "C++", progress: 90},
        {lang: "C#", progress: 85},
        {lang: "Python", progress: 85},
        {lang: "Java", progress: 80},
        {lang: "Assembly", progress: 70},
        {lang: "JavaScript", progress: 60},
        {lang: "SQL", progress: 55},
        {lang: "R", progress: 30},
      ]
    }
  }
}
</script>

<style>
ul li:not(:first-child) {
    margin-left: 0px;
}
</style>