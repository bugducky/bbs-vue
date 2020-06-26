<template>
  <div>
    <el-container>
      <el-header>
        <Myheader></Myheader>
      </el-header>

      <el-main>
        <Main></Main>
      </el-main>

      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import Main from "./Main";
import Myheader from "./Header";

export default {
  components: {
    Main,
    Myheader
  },
};
</script>


