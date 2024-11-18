<template>
    <div :id="'new' + aNew.id" class="card">
        <img
            class="card-img-top"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Dublin_Philharmonic_Orchestra_performing_Tchaikovsky%27s_Symphony_No_4_in_Charlotte%2C_North_Carolina.jpg/800px-Dublin_Philharmonic_Orchestra_performing_Tchaikovsky%27s_Symphony_No_4_in_Charlotte%2C_North_Carolina.jpg"
        />
        <div class="card-body">
            <div class="card-title">
                {{ aNew.title }}
            </div>
            <p class="card-text">{{ aNew.body }}</p>
            <router-link
                :to="{ name: 'NewView', params: { id: aNew.id } }"
                class="btn btn-primary"
                >Leer</router-link
            >
        </div>
    </div>
</template>
<script>
export default {
  props: ['aNew'],
};
</script>
<style lang="scss" scoped>
    .card-text {
        height: 92px;
        text-overflow: ellipsis;
        overflow:hidden;
        // Addition lines for 2 line or multiline ellipsis
        display: -webkit-box !important;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        white-space: normal;
    }
</style>
