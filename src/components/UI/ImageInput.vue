<template>
    <div class="form-group">
        <label>Imagen</label>
        <input class="form-control" type="file" @change="handleChange" accept="image/*" />
        <img :src="image" >
    </div>
</template>
<script>
export default {
    data() {
        return {
            image: ''
        }
    },
    methods: {
        handleChange(e) {
            const selectedImage = e.target.files[0];
            this.createBase64Image(selectedImage);
        },
        createBase64Image(fileObject) {
            const reader = new FileReader();

            reader.onload = (e) => {
                this.image = btoa(e.target.result);
                console.log(this.image)
                this.$emit('input', this.image)
            };
            reader.readAsBinaryString(fileObject);
        }
    }
}
</script>