<template>
<div class="modal">
    <spinner class="spinner" :line-size="10" :size="100">
    </spinner>
</div>
</template>
<script>
import Spinner from 'vue-simple-spinner'
export default{
    components:{
        Spinner
    }
}
</script>
<style scoped>
.modal{display: block; position:fixed; z-index:1; left:0; top:0;
width:100%;height:100%; overflow:auto; background-color:rgb(0,0,0);
background-color:rgba(0,0,0,0.4);}
.spinner{position:absolute; left:5; top:5; margin-top:10%; margin-left:47%;}
</style>