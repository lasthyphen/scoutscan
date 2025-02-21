<template>
  <q-card
    class="q-pt-md q-pl-xl q-pr-xs q-ml-xs q-pb-md panely2" id="custom-card" >
      <div class="col-md-3 col-xs-10 panely3">
        <div v-if="isValidatorShow(nodeID)" style="cursor: pointer;" @click="copyToClipboard(nodeID)">
          <div class="q-pb-md text-medium label-title clippy">NODE - VALIDATOR</div>
          <div class="text-h7 text-panel q-pb-md q-pt-xs text-title1">{{ formatNodeID }}</div>
          <tooltip-style v-bind:text="'Copy to Clipboard'" />
        </div>
        <div v-else>
          <div class="q-pb-md text-medium label-title">NODE</div>
          <div class="text-h7 text-panel q-pb-md q-pt-xs text-title1">{{ formatNodeID }}</div>
        </div>
        <div v-if="nodeHealthInfo" class="q-pt-md">
          <q-btn :color="color" no-caps outline size="sm" label="Check Health" @click="onOpenHealth"/>
          <node-health-dialog ref="nodeHealthDialog" v-bind:validator="validatorById(nodeID) ? validatorById(nodeID) : {}"/>
        </div>
      </div>
      <div class="col-md-3 col-xs-10 panely3">
        <div class="q-pb-md text-medium label-title clippy">PEER CONNECTIONS</div>
        <div class="q-pb-md" style="font-size: max(0.8vw, 12px);" v-if="peersLength > 0">
         <small class="text-purple">Connected with</small>
         <div class="text-panel">
            <animated-number
              :value="peersLength"
              :formatValue="format"
              :duration="3000"
            />
         </div>
        </div>
        <div v-else>
           <q-spinner-dots
            color="primary"
            size="2em"
          />
        </div>
        <q-btn class="text-purple" outline label="Peers" no-caps size="sm" @click="$router.push('/peers/' + nodeID)" />
      </div>
      <div class="col-md-3 col-xs-10 panely3">
        <div class="q-pb-md text-medium label-title clippy">
          ENDPOINT
          <q-spinner-ball v-if="ui.doesItConnect" />
        </div>
        <div class="q-pb-md">
          <div class="text-purple text-title1">{{ networkEndpoint.name }}</div>
        </div>
        <div class="q-mt-md label-title">
          <span class="q-pt-xl text-panel">{{ networkEndpoint.urlView }}</span>
        </div>
      </div>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'

import AnimatedNumber from 'animated-number-vue'

import {
  copyToClipboard
} from 'quasar'

export default {
  name: 'Node',
  components: {
    TooltipStyle: () => import('components/tooltip-style'),
    NodeHealthDialog: () => import('components/dialogs/node-health-dialog'),
    AnimatedNumber
  },
  data () {
    return {
      filter: ''
    }
  },
  computed: {
    ...mapGetters([
      'ui',
      'height',
      'nodeID',
      'peers',
      'nodeInfo',
      'nodeHealth',
      'validatorById',
      'networkEndpoint'
    ]),
    nodeHealthInfo: function () {
      return this.nodeHealth(this.nodeID)
    },
    peersLength: function () {
      if (this.peers && this.peers.numPeers) return this.peers.numPeers
      else if (this.peers) return this.peers.length
      return 0
    },
    healthy: function () {
      if (!this.nodeHealth(this.nodeID)) return
      return this.nodeHealthInfo.healthy
    },
    color: function () {
      if (this.healthy) return 'positive'
      return 'negative'
    },
    formatNodeID: function () {
      if (!this.nodeID) return
      return `${this.nodeID.substr(0, 22)}...${this.nodeID.substr(32)}`
    }
  },
  methods: {
    isValidatorShow (id) {
      const isVal = this.validatorById(id)
      return isVal
    },
    format (value) {
      return `${Math.round(value)} peers`
    },
    copyToClipboard (text) {
      copyToClipboard(text)
    },
    onOpenHealth () {
      this.$refs.nodeHealthDialog.open()
    }
  }
}
</script>

<style scoped>
 #custom-card {
   border-right: 2px solid grey;
 }
 .custom-icon {
   width:30vw;
   max-width:30px;
 }
 .label-title {
    font-size: max(0.7vw, 14px);
  }
  .text-title1 {
    font-size: max(0.8vw, 14.5px);
  }
</style>
