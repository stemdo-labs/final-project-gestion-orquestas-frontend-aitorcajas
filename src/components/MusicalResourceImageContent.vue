<template>
    <div>
        <image-input :value="value" v-on:input="changedImage" v-if="editable">
            <label>Imagen</label>
            <input class="form-control" v-on:input="changedImage($event)" type="file" />
        </image-input>
        <img v-if="value" width="400" :src="'data:image/png;base64,' + value" />
    </div>
</template>
<script>
import ImageInput from '@/components/UI/ImageInput';
export default {
    components: {
        ImageInput
    },
    props: {
        value: {
            required: true,
            type: String
        },
        mode: {
            type: String,
            default: 'view'
        }
    },
    computed: {
        editable() {
            return ['add', 'edit'].includes(this.mode)
        }
    },
    methods: {
        changedImage(image) {
            this.$emit('input',image);
        }
    }
}
</script>