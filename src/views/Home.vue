<template>
  <div class="page">
    <div class="buttons">
      <b-button v-b-modal.add-modal>Add Calendar Event</b-button>
    </div>
    <full-calendar
      defaultView="month"
      :events="events"
      @event-selected="openEditModal"
    />
    <b-modal
      id="add-modal"
      hide-footer
      ref="add-modal"
      title="Add Calendar Event"
    >
      <calendar-form :edit="false" @eventSaved="closeModal()" />
    </b-modal>

    <b-modal
      id="edit-modal"
      hide-footer
      ref="edit-modal"
      title="Edit Calendar Event"
    >
      <calendar-form
        :calendarEvent="calendarEvent"
        :edit="true"
        @eventSaved="closeModal()"
      ></calendar-form>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import { requestsMixin } from '../mixins/requestMixin'
import CalendarForm from '../components/CalendarForm.vue'

export default {
  name: 'Home',
  components: {
    CalendarForm
  },
  mixins: [requestsMixin],
  computed: {

  },
  data () {
    return {
      calendarEvent: {}
    }
  },
  async mounted () {
    await this.events()
  },
  methods: {
    events () {
      return this.$store.state.events
    },
    getEvents: async () => {
      const response = await this.getCalendar()
      this.$store.commit('setEvents', response.data)
    },
    closeModal () {
      this.$refs['add-modal'].hide()
      this.$refs['edit-modal'].hide()
      this.calendarEvent = {}
    },
    openEditModal (event) {
      const { id, start, end, title } = event
      this.calendarEvent = { id, start, end, title }
      this.$refs['edit-modal'].show()
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  margin-bottom: 10px;
}
</style>
