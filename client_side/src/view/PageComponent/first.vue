<script setup lang="ts">
// 导入gasp
import { gsap } from "gsap";
import { SplitText, ScrollTrigger, Draggable } from "gsap/all";
gsap.registerPlugin(SplitText, ScrollTrigger, Draggable);

import { onMounted } from "vue";
// 图片地址
import MyAvatar from "@/assets/images/my.jpeg";
// 导入组件
import LittleDown from "@/components/LittleDown/index.vue";

// gasp动画第一页
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

  // 首页动画
  gsap.to(".main", {
    //滚动触发器
    scrollTrigger: {
      //滚动到元素
      trigger: ".main",
      //滚动位置
      start: "top -100px",
      //滚动元素出发动画模式 (前 后 反向 反向后)
      toggleActions: "restart none reverse none",
      // 根据滚动平滑滚动回退
      scrub: true,
    },
    x: 20,
    y: -100,
    width: "90%",
    duration: 4,
    // ease: "power1.out",
  });
});

// gsap动画第二页
onMounted(() => {
  Draggable.create(".reverse .item", {
    onClick: () => {
      gsap.to(".reverse .item", {
        rotationY: -180,
        duration: 2,
        ease: "power1.out",
      });
    },
  });
});
</script>

<template>
  <div class="firstContent">
    <div class="first">
      <div class="main">
        <n-avatar class="avatar" lazy round :size="150" :src="MyAvatar" />
        <div class="actionPlay">
          <span class="split">
            你好，这里是乌龙史莱姆大王的个人空间<br />欢迎你的到来<br />
            WelCome!
          </span>
        </div>
      </div>
    </div>
    <div class="second">
      <div class="banner">
        <ul class="bannerItemLeft">
          <li style="height: 100%; left: 0px">
            <img src="@/assets/images/Mountain.jpg" alt="" />
          </li>
          <li style="height: 103%; left: 15%; border-color: #d6d6d6">
            <img src="@/assets/images/RedCat.jpg" alt="" />
          </li>
          <li style="height: 106%; left: 30%; border-color: #e0e0e0">
            <img src="@/assets/images/ReadMan.jpg" alt="" />
          </li>
          <li style="height: 109%; left: 45%; border-color: #fafafa">
            <img src="@/assets/images/SnowCat.jpg" alt="" />
          </li>
        </ul>
        <ul class="BannerItemMain">
          <li
            style="
              left: -45%;
              border-right: 0;
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
            "
          ></li>
          <span></span>
          <li
            class="reverse"
            style="
              right: -45%;
              border-left: 0;
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
            "
          >
            <div class="item">
              <img src="@/assets/images/CatFish.jpg" alt="" />
            </div>
          </li>
          <li
            style="
              right: -45%;
              border-left: 0;
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
            "
          ></li>
        </ul>
        <ul class="bannerItemRight">
          <li style="height: 100%; right: 0%">
            <img src="@/assets/images/DancePeople.jpg" alt="" />
          </li>
          <li style="height: 103%; right: 15%; border-color: #d6d6d6">
            <img src="@/assets/images/FishMan.jpg" alt="" />
          </li>
          <li style="height: 106%; right: 30%; border-color: #e0e0e0">
            <img src="@/assets/images/CatFish.jpg" alt="" />
          </li>
          <li style="height: 109%; right: 45%; border-color: #fafafa">
            <img src="@/assets/images/PaperCart.jpg" alt="" />
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <LittleDown />
    </div>
  </div>
</template>

<style scoped lang="scss">
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: block;
  box-sizing: border-box;
}
.firstContent {
  margin-top: 36px;
  min-height: 150vh;
  background-color: peachpuff;
  height: 400vh;
  & .first {
    width: 100%;
    justify-content: center;
    position: relative;
    display: flex;
    & .main {
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      width: 100%;
      height: 98vh;
      background-image: url("@/assets/images/abstract.png");
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
  }
  // 第二区域
  & .second {
    width: 100%;
    height: 600px;
    margin-top: 200px;
    & .banner {
      width: 100%;
      height: 100%;
      display: flex;
      & ul {
        display: flex;
        height: 100%;
        flex: 4;
      }
      & .bannerItemLeft,
      .bannerItemRight,
      .BannerItemMain {
        position: relative;
        display: flex;
        align-items: center;
        & li {
          border-radius: 15px;
          border: 20px solid #bcbcbc;
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          & img {
            width: 100%;
            height: 100%;
          }
        }
      }
      & .BannerItemMain {
        & span {
          position: absolute;
          z-index: 9999;
          height: 105%;
          width: 1px;
          background-color: #fff;
          right: 50%;
        }
        & .reverse {
          z-index: 99999;
          transform-style: preserve-3d;
          perspective: 3000px;
          position: relative;
          & .item {
            box-sizing: content-box;
            transform-origin: left;
            width: 100%;
            height: 100%;
            border-radius: 15px;
            border: 25px solid #ffffff;
            position: absolute;
            top: -25px;
            right: -42px;
            border-left: 0;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
        & li {
          width: 95%;
          height: 112%;
          border: 25px solid #f8f8f8;
          z-index: 999;
          background-color: #e9e9e9;
        }
      }
    }
  }
  & .footer {
    position: absolute;
    bottom: 35px;
    left: 0;
    width: 100%;
    height: 400px;
  }
}
</style>
