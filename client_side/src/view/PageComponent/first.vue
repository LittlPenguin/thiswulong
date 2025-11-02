<script setup lang="ts">
// 导入gasp
import { gsap } from "gsap";
import { SplitText, ScrollTrigger, ScrollSmoother } from "gsap/all";
// ScrollSmoother requires ScrollTrigger
gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother);

import { onMounted } from "vue";
// 图片地址
import MyAvatar from "@/assets/my.jpeg";
// 导入组件
import LittleDown from "@/components/LittleDown/LittleDown.vue";

// gasp动画
onMounted(() => {
  // 头像动画
  gsap.fromTo(
    ".avatar",
    { autoAlpha: 0, x: 200 },
    { autoAlpha: 1, x: -100, duration: 1 }
  );
  gsap.from(".avatar", {
    rotation: 180,
    duration: 4,
    ease: "elastic",
  });

  //   文字动画
  const segmenter = new Intl.Segmenter("zh", { granularity: "word" });
  document.fonts.ready.then(() => {
    gsap.set(".split", { opacity: 1 });
    SplitText.create(".split", {
      type: "words",
      wordsClass: "word",
      prepareText: (text) => {
        return [...segmenter.segment(text)]
          .map((s) => s.segment)
          .join(String.fromCharCode(8204));
      },
      wordDelimiter: { delimiter: /\u200c/, replaceWith: "" },
      autoSplit: true,
      onSplit: (self) => {
        return gsap.from(self.words, {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          ease: "back",
        });
      },
    });
  });

  gsap.to(".first", {
    scrollTrigger: {
      trigger: ".first",
      start: "top -100px",
      toggleActions: "restart none reverse none",
      scrub: true,
    },
    x: 20,
    y: -100,
    width: "90%",
    duration: 4,
    // ease: "power1.out",
  });
});
</script>

<template>
  <div class="firstContent">
    <div class="first">
      <n-avatar class="avatar" lazy round :size="150" :src="MyAvatar" />
      <div class="actionPlay">
        <span class="split">
          你好，这里是乌龙史莱姆大王的个人空间<br />欢迎你的到来<br />
          WelCome!
        </span>
      </div>
    </div>
    <div class="second"></div>
    <div class="footer">
      <LittleDown />
    </div>
  </div>
</template>

<style scoped lang="scss">
.firstContent {
  height: 300vh;
  min-height: 150vh;
  background-color: peachpuff;
  position: relative;
  display: flex;
  justify-content: center;
  .first {
    border-radius: 15px;
    width: 100%;
    height: 95vh;
    background-image: url("@/assets/abstract.png");
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    & .avatar {
      right: 0;
      top: 72vh;
      position: absolute;
    }
    & .actionPlay {
      position: absolute;
      top: 0;
      // right: 0;
      font-size: 50px;
      padding: 30px 150px 0 50px;
      & span {
        user-select: none;
        text-align: start;
        color: #764a17;
        letter-spacing: 15px;
        display: block;
        font-weight: 800;
      }
    }
  }

  // 第二区域
  .second {
  }
  & .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 300px;
  }
}
</style>
