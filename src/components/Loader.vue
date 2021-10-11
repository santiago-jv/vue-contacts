<template>
    <div class="loader"></div>
</template>

<script>
export default {
    name:'Loader'
}
</script>

<style scoped>
    .loader {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border-left-color: var(--primary-color);
        margin:1rem auto;
        animation: spin 1s ease infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>