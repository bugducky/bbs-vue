
<template>
  <div>
    
  </div>
</template>

<script>

import uuidv1 from 'uuid/v1';
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  components: {
    mavonEditor
  },
  computed: {
    uuid() {
      return uuidv1();
    }
  },
  
}
</script>