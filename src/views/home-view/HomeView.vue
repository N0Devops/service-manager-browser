<template>
  <div class="home-view fullscreen flex flex-col">
    <!--    <div class="w-[300px] h-full">-->
    <!--      <program-list></program-list>-->
    <!--    </div>-->
    <!--    <div class="flex-grow h-full overflow-hidden">-->
    <!--      <router-view></router-view>-->
    <!--    </div>-->
    <div>
      <navigation-menu></navigation-menu>
    </div>
    <div class="flex-grow overflow-hidden">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavigationMenu from "@/views/home-view/navigation-menu/NavigationMenu.vue"; // @ is an alias to /src

</script>
