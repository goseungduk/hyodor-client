<template>
<div id="container">
    <div id="example">
        <img src="../assets/logo.png" width="100" height="100">
        지금 효도르를 시작해보세요!
    </div>
    <div>
        <p><input type="text" placeholder="아이디"></p>
        <p><input type="text" placeholder="비밀번호"></p>
        <router-link to="/home" class="btn btn-info menu">로그인하기</router-link>
    </div>
</div>
</template>
<style>
#example{margin:10px auto; max-width:820px; min-width:820px;
padding:0px; position:relative; font:13px "verdana";}
#container {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>