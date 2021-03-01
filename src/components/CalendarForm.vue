<template>
  <div>
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <b-form @submit.prevent="onSubmit" novalidate>
        <b-form-group label="Title" label-for="title">
          <ValidationProvider name="title" rules="required" v-slot="{ errors }">
            <b-form-input
              name="title"
              placeholder="Title"
              required
              type="text"
              v-model="form.title"
              :state="errors.length == 0"
            ></b-form-input>
            <b-form-invalid-feedback :state="errors.length == 0">Title is required</b-form-invalid-feedback>
          </ValidationProvider>
        </b-form-group>
        <b-form-group label="Start" label-for="start">
          <ValidationProvider name="start" rules="required" v-slot="{ errors }">
            <VueCtkDateTimePicker
              input-class="form-control"
              name="start"
              v-model="form.start"
              :state="errors.length == 0"
            ></VueCtkDateTimePicker>
            <b-form-invalid-feedback :state="errors.length == 0">Start is required</b-form-invalid-feedback>
          </ValidationProvider>
        </b-form-group>
        <b-form-group label="End" label-for="end">
          <ValidationProvider name="end" rules="required" v-slot="{ errors }">
            <VueCtkDateTimePicker
              input-class="form-control"
              name="end"
              v-model="form.end"
              :state="errors.length == 0"
            ></VueCtkDateTimePicker>
            <b-form-invalid-feedback :state="errors.length == 0">End is required</b-form-invalid-feedback>
          </ValidationProvider>
        </b-form-group>
        <b-button type="submit" variant="primary">Save</b-button>
        <b-button type="button" variant="primary" @click="deleteEvent(form.id)">Delete</b-button>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import { requestsMixin } from '../mixins/requestsMixin'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import moment from 'moment'
export default {
  name: 'CalendarForm',
  components: { ValidationProvider, ValidationObserver },
  props: {
    edit: Boolean,
    calendarEvent: Object
  },
  mixins: [requestsMixin],
  data () {
    return {
      form: {}
    }
  },
  watch: {
    calendarEvent: {
      immediate: true,
      deep: true,
      handler (val, oldVal) {
        this.form = val || {}
      }
    }
  },
  methods: {
    async onSubmit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.form.start = moment(this.form.start, 'YYYY-MM-DD HH:mm:ss')
      this.form.end = moment(this.form.end, 'YYYY-MM-DD HH:mm:ss')
      if (this.edit) {
        await this.editCalendar(this.form)
      } else {
        await this.addCalendar(this.form)
      }
      const response = await this.getCalendar()
      this.$store.commit('setEvents', response.data)
      this.$emit('eventSaved')
    },
    async deleteEvent (id) {
      await this.deleteCalendar(id)
      const response = await this.getCalendar()
      this.$store.commit('setEvents', response.data)
      this.$emit('eventSaved')
    }
  }
}
</script>

<style scoped lang="scss">
button {
  margin-right: 10px;
}
</style>
