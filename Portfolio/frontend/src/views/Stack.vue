<template>
  <div class="sort-center" style="min-height: 100vh;">
    <div class="h3 bg-primary p-4 text-white w-100 text-center">Skill Stack</div>
    <!-- Web -->
    <table class="table w-75 mt-5">
      <thead>
        <tr>
          <th scope="col">분야</th>
          <th scope="col">분류</th>
          <th scope="col">스택</th>
          <th scope="col">Level</th>
          <th scope="col">근거</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ablility in web.frontend" :key="ablility.id">
          <th v-if="ablility.id === 0" scope="row" :rowspan="web.len" class="align-middle">Web</th>
          <td v-if="ablility.index === 0" :rowspan="web.frontend.length" class="align-middle">Frontend</td>
          <td>{{ablility.stack}}</td>
          <td>{{num2Stars(ablility.level)}}</td>
          <td>{{ablility.contents}}</td>
        </tr>
        <tr v-for="ablility in web.backend" :key="ablility.id">
          <th v-if="ablility.id === 0" scope="row" :rowspan="web.len" class="align-middle">Web</th>
          <td v-if="ablility.index === 0" :rowspan="web.frontend.length" class="align-middle">Backend</td>
          <td>{{ablility.stack}}</td>
          <td>{{num2Stars(ablility.level)}}</td>
          <td>{{ablility.contents}}</td>
        </tr>
        <tr v-for="ablility in web.devops" :key="ablility.id">
          <th v-if="ablility.id === 0" scope="row" :rowspan="web.len" class="align-middle">Web</th>
          <td v-if="ablility.index === 0" :rowspan="web.frontend.length" class="align-middle">DevOps</td>
          <td>{{ablility.stack}}</td>
          <td>{{num2Stars(ablility.level)}}</td>
          <td>{{ablility.contents}}</td>
        </tr> 
      </tbody>
    </table>
    <!-- Embedded -->
    <table class="table w-75 mt-5">
      <thead>
        <tr>
          <th scope="col">분야</th>
          <th scope="col">분류</th>
          <th scope="col">스택</th>
          <th scope="col">Level</th>
          <th scope="col">근거</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ablility in embedded.firmware" :key="ablility.id">
          <th v-if="ablility.id === 0" scope="row" :rowspan="embedded.len" class="align-middle">Embedded</th>
          <td v-if="ablility.index === 0" :rowspan="embedded.firmware.length" class="align-middle">Firmware</td>
          <td>{{ablility.stack}}</td>
          <td>{{num2Stars(ablility.level)}}</td>
          <td>{{ablility.contents}}</td>
        </tr>
        <tr v-for="ablility in embedded.rtos" :key="ablility.id">
          <th v-if="ablility.id === 0" scope="row" :rowspan="embedded.len" class="align-middle">Embedded</th>
          <td v-if="ablility.index === 0" :rowspan="embedded.rtos.length" class="align-middle">RTOS</td>
          <td>{{ablility.stack}}</td>
          <td>{{num2Stars(ablility.level)}}</td>
          <td>{{ablility.contents}}</td>
        </tr>
        <tr v-for="ablility in embedded.tool" :key="ablility.id">
          <th v-if="ablility.id === 0" scope="row" :rowspan="embedded.len" class="align-middle">Embedded</th>
          <td v-if="ablility.index === 0" :rowspan="embedded.tool.length" class="align-middle">장비</td>
          <td>{{ablility.stack}}</td>
          <td>{{num2Stars(ablility.level)}}</td>
          <td>{{ablility.contents}}</td>
        </tr> 
        <tr v-for="ablility in embedded.driver" :key="ablility.id">
          <th v-if="ablility.id === 0" scope="row" :rowspan="embedded.len" class="align-middle">Embedded</th>
          <td v-if="ablility.index === 0" :rowspan="embedded.driver.length" class="align-middle">Device Driver</td>
          <td>{{ablility.stack}}</td>
          <td>{{num2Stars(ablility.level)}}</td>
          <td>{{ablility.contents}}</td>
        </tr> 
        <tr v-for="ablility in embedded.embeddedui" :key="ablility.id">
          <th v-if="ablility.id === 0" scope="row" :rowspan="embedded.len" class="align-middle">Embedded</th>
          <td v-if="ablility.index === 0" :rowspan="embedded.embeddedui.length" class="align-middle">Embedded UI</td>
          <td>{{ablility.stack}}</td>
          <td>{{num2Stars(ablility.level)}}</td>
          <td>{{ablility.contents}}</td>
        </tr> 
        <tr v-for="ablility in embedded.iot" :key="ablility.id">
          <th v-if="ablility.id === 0" scope="row" :rowspan="embedded.len" class="align-middle">Embedded</th>
          <td v-if="ablility.index === 0" :rowspan="embedded.iot.length" class="align-middle">IoT</td>
          <td>{{ablility.stack}}</td>
          <td>{{num2Stars(ablility.level)}}</td>
          <td>{{ablility.contents}}</td>
        </tr> 
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      web: {
        len: 11,
        frontend: [
          {
            id: 0,
            index: 0,
            stack: "HTML/CSS",
            level: 5,
            contents: "웹페이지 클론 코딩 가능"
          },
          {
            id: 1,
            index: 1,
            stack: "Bootstrap",
            level: 4,
            contents: "Document 참고하여 개발 가능"
          },
          {
            id: 2,
            index: 2,
            stack: "Vue.js",
            level: 3,
            contents: "Web Project 개발 경험 보유"
          },
          {
            id: 3,
            index: 3,
            stack: "React.js",
            level: 1,
            contents: "Document 참고하여 개발 가능"
          }
        ],
        backend: [
          {
            id: 4,
            index: 0,
            stack: "Node.js",
            level: 1,
            contents: "비동기 통신 / REST / Web Server 개발 및 운영"
          },
          {
            id: 5,
            index: 1,
            stack: "MySQL",
            level: 1,
            contents: "MySQL / MariaDB를 사용한 다수의 프로젝트 경험 보유"
          },
          {
            id: 6,
            index: 2,
            stack: "Mongo DB",
            level: 1,
            contents: "Node.js + Mongo DB 프로젝트 진행 예정"
          },
          {
            id: 7,
            index: 3,
            stack: "Spring Framework",
            level: 1,
            contents: "프레임워크 구조에 대한 이해 및 프로젝트 경험 보유"
          }
        ],
        devops: [
          {
            id: 8,
            index: 0,
            stack: "AWS",
            level: 1,
            contents: "EC2 Instance를 사용하여 LAMP Stack 구축 및 서버 운영 경험 보유, 다양한 AWS 교육 프로그램 이수"
          },
          {
            id: 9,
            index: 1,
            stack: "Nginx",
            level: 1,
            contents: "웹 서버 운영"
          },
          {
            id: 10,
            index: 2,
            stack: "Jenkins",
            level: 1,
            contents: "배포 서버 운영"
          }
        ]
      },
      embedded: {
        len: 12,
        firmware: [
          {
            id: 0,
            index: 0,
            stack: "ARM",
            level: 1,
            contents: "Cortext-M3/A7 아키텍쳐 이해 및 개발 경험 보유"
          },
          {
            id: 1,
            index: 1,
            stack: "Raspberry pi",
            level: 1,
            contents: "Raspberry pi에서 C와 Python으로 Firmware 개발 경험 보유"
          },
          {
            id: 2,
            index: 2,
            stack: "NUCLEO-F103RB",
            level: 1,
            contents: "ST사 보드 개발(Cortex-M3) 진행 예정"
          }
        ],
        rtos: [
          {
            id: 3,
            index: 0,
            stack: "FreeRTOS",
            level: 1,
            contents: "Thread Programming / 모듈 제어 가능"
          }
        ],
        tool: [
          {
            id: 4,
            index: 0,
            stack: "회로도 이해",
            level: 1,
            contents: "Datasheet / Schematic 분석 가능"
          },
          {
            id: 5,
            index: 1,
            stack: "기본 계측",
            level: 1,
            contents: "멀티미터 / 오실로스코프 경험 보유"
          },
          {
            id: 6,
            index: 2,
            stack: "Debugger",
            level: 1,
            contents: "ST-Link / V2, IAR 환경에서 디버깅"
          }
        ],
        driver: [
          {
            id: 7,
            index: 0,
            stack: "Linux Kernel",
            level: 1,
            contents: "자유롭게 사용 가능, Linux 커널 분석 경험 보유"
          },
          {
            id: 8,
            index: 1,
            stack: "Linux Device Driver",
            level: 1,
            contents: "Device Tree / 캐릭터 Device Driver 개발 경험 보유"
          }
        ],
        embeddedui: [
          {
            id: 9,
            index: 0,
            stack: "Qt",
            level: 1,
            contents: "C++ 대신, Python으로 개발(PyQt)"
          }
        ],
        iot: [
          {
            id: 10,
            index: 0,
            stack: "Connectivity",
            level: 1,
            contents: "MQTT, LoRa, BLE, Wifi"
          },
          {
            id: 11,
            index: 1,
            stack: "Security",
            level: 1,
            contents: "SSL/TLS"
          }
        ]
      }
    }
  },
  methods: {
    num2Stars(num){
      if(num === 0){
        return "학습 예정";
      }
      let stars = "";
      while(num>0){
        stars += "⭐";
        num--;
      }
      return stars;
    }
  }
}
</script>

<style>
.sort-center{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 100vh;
  border-top: 1px solid #dddddd;
}
</style>