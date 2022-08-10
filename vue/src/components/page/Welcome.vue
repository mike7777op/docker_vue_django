<template>
    <div style="padding:20px;">
        <h1>Welcome {{user_name}} !!!</h1>
    </div>
</template>
<script>
export default {
    name:"welcome",
    data(){
        return {
            user_name:localStorage.getItem("user_name"),
        };
    },
};
</script>